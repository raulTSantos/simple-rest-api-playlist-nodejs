
import type { NextFunction, Request, Response } from "express";
import prisma from "../../datasource";
import jwt from 'jsonwebtoken';

export const createSong = async (req:Request, res:Response): Promise<void> => {
    try {
        const {body} = req;
        body.year = new Date(body.year);

        const song = await prisma.song.create({
            data: {
                ...body
            }
        });
        res.status(201).json({ok:true, data:song, message: "Song creado correctamente"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, message: error });
    }
};

export const findAllSongs = async (req:Request, res:Response,next:NextFunction): Promise<void> => {
    
    try {
        const { authorization } = req.headers;
        const token = authorization?.split(' ')[1]
        if(token==null) {
            const songs = await findPublicSong();
            res.status(200).json({
                ok: true,
                data: songs,
            });
            
        }else{
            jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, async (err: any, user: any) => {
                (req as any).user=user;
                console.log(user);
                
                if (err) return res.sendStatus(403);
                const songs = await prisma.song.findMany();
                res.status(200).json({
                    ok: true,
                    data: songs,
                });
            });
            
        }
        
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}
export const findSongById = async (req:Request, res:Response):Promise<void> =>{
    try {
        const {id} = req.params;
        const song = await prisma.song.findUnique({
            where: {
                id:Number(id)
            }
        });
        res.status(200).json({ ok: true, data:song });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });      
    }
};
function findPublicSong(){
    return prisma.song.findMany({
        where: {
            privatized: false
        }
    });
}