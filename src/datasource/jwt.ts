
import jwt from 'jsonwebtoken';

function generateAccessToken(user:any) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET  as string, {
      expiresIn: '5m',
    });
}
function generateRefreshToken(user:any) {
    return jwt.sign({ userId: user.id ,email:user.email}, process.env.JWT_ACCESS_SECRET  as string, {
      expiresIn: '8h',
    });
}
export function generateTokens(user:any) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    return {
      accessToken,
      refreshToken,
    };
}