import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";


if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not from .env file");
}

export const generateAccessToken = (payload) => {

    try{
      
    if(payload.id){
        const {id, role, email, ...rest} = payload;
        return jwt.sign({id, role, email}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }catch(err){
        throw new Error("Failed to generate access token", err.message);
    }
};

export const generateRefreshToken = (payload) => {
    try{
        if(payload.id){
            const {id, role, email, ...rest} = payload;
            return jwt.sign({id, role, email}, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
        }
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
    }catch(err){
        throw new Error("Failed to generate refresh token", err.message);
    }
};

export const verifyAccessToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(err){
        throw new Error("Failed to verify access token", err.message);
    }
};

export const decodeToken = (token) => {
    try{
        return jwt.decode(token);
    }catch(err){
        throw new Error("Failed to decode token", err.message);
    }
};
