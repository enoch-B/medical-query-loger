import prisma from "../config/database.js";

export const createQuery = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Medical query text is required",
            });
        }

        const saved = await prisma.query.create({
            data: { text },
        });

        res.status(201).json({
            message: "Medical query logged successfully",
            data: saved,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllQueries = async (req, res, next) => {
    try {
        const queries = await prisma.query.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({
            message: "Queries fetched successfully",
            data: queries,
        });
    } catch (err) {
        next(err);
    }
};
