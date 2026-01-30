import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/**
 * Protect route middleware
 * Verifies JWT token and attaches the account (User or Institution) to req.account
 */
export const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);


    let account = await prisma.user.findUnique({where: {id: decoded.id}});

    if (!account) {
      account = await prisma.user.findUnique({where: {id: decoded.id}});
    }

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }

    req.account = account; // attach account to request
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

/**
 * Authorize roles middleware
 * @param  {...string} roles - allowed roles
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.account) {
      return res.status(403).json({ message: "No account attached" });
    }

    if (!roles.includes(req.account.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
};
