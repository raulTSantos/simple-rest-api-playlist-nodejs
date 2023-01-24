import type { Request, Response } from "express";

import prisma from "../../datasource";

export const findAllPlaylists = async (req: Request, res: Response): Promise<void> =>{
    try {
        const {user_id}= req.body;
        const playlist = await prisma.playlist.findMany(
            {
                where :{
                    userId :user_id
                },
                include: {songs: true}
            },
        );
        
        res.status(200).json({
            ok: true,
            data: playlist,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
    
}

export const createOrUpdatePlaylist = async (req: Request, res:Response): Promise<void> =>{
    try {
        const {playlist_id,song_id,name,user_id} = req.body;
        
        const  playlist = await prisma.playlist.upsert({
            where: {
                id:playlist_id || 0
            },
            update: {
                name: name,
                songs: {
                    set:Array.isArray(song_id) ? song_id.map((x:number) =>({id:x})): [{id:song_id}]}
            },
            create: {
                name: name,
                users: {connect :{id:user_id}},
                songs:{connect :Array.isArray(song_id) ? song_id.map((x:number) =>({id:x})):[{id:song_id}]}
            }
        });
        
        res.status(200).json({
            ok: true,
            data: playlist,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}