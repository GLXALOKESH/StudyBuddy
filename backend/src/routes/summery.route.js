import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { getSummerySubjects ,  summerizeNote} from "../controllers/summerise.controller.js";

const router = Router();

router.route("/get-summery-subjects").post(verifyToken, getSummerySubjects);
router.route("/summerize").post(verifyToken,summerizeNote);

export default router;