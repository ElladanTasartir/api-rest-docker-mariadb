import { Router } from "express";

import photoController from "../controllers/PhotoController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, photoController.store);
// upload.single porque queremos apenas um arquivo sendo enviado
// como argumento, recebe o nome do campo enviado

export default router;
