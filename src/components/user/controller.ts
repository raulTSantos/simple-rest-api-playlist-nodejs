import prisma from "../../datasource";
import { generateTokens } from "../../datasource/jwt";

import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

function findUserByEmail(email:string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
}

export const createUser = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const data = req.body;

        if(!data.email || !data.password){
            res.status(400).json({
                ok: false,
                error: "Email and password are required",
            });
        }
        data.password = bcrypt.hashSync(data.password, 12);
        const user = await prisma.user.create({data});
        const {accessToken,refreshToken} = generateTokens(user);
        res.status(201).json({
            ok:true,
            data:user,
            accessToken,
            refreshToken,
          });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req:Request, res:Response,next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ok:false, message:"Email and password are required"});
            throw new Error('Email and password are required');
        }
        const existingUser = await findUserByEmail(email);
        if(!existingUser) {
            res.status(403).json({ok: false,message: "User not found",});
            throw new Error('Invalid login credentials.');
        }
        
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403).json({ok: false,message: "Password is invalid",});
            throw new Error('Invalid login credentials.');
        }
        const {accessToken,refreshToken} = generateTokens(existingUser);
        res.status(200).json({
            ok:true,
            menssage:"bienvenido usuario",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
        
    }
};
