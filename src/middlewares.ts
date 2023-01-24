import jwt, { Secret, JwtPayload} from 'jsonwebtoken';
import type { Request, Response, NextFunction } from "express";


export interface CustomRequest extends Request {
  payload: string | JwtPayload;
}

export function authenticateToken(req: Request, res: Response,next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_ACCESS_SECRET as  Secret, (error:any, payload:any) => {
      if (error) return res.sendStatus(403);
      (req as CustomRequest).payload= payload;
      next();
    });
};
