import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { generateAccessToken,generateRefreshToken, verifyAccessToken } from "../utils/jwt.js";

//refster user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        res.status(201).json({ message: "User registered successfully", data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to register user", error: err.message });
    }
}


//login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

    const accessToken = generateAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, name: user.name, email: user.email, role: user.role })

        



        res.status(200).json({ message: "User logged in successfully", data: user, accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login user", error: err.message });
    }
}