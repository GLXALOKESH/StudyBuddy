import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { getSummerySubjects } from "../controllers/summerise.controller.js";

const router = Router();

router.route("/get-summery-subjects").post(verifyToken, getSummerySubjects);


export default router;