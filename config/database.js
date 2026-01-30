import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';  // ← Use default import

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);  // ← Pass Pool instance, not string
const prisma = new PrismaClient({ adapter });

//Check if the connection is working
prisma.$connect().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Error connecting to database", err);
});

export default prisma;