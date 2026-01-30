import {registerUser, loginUser} from "../controllers/userControllers.js";
import {Router} from "express";
import {authenticate, authorizeRoles} from "../middleware/authenticate.js";

const router = Router();
    
router.post("/register", registerUser);
router.post("/login",  loginUser);

export default router;