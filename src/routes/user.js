import { Router } from "express";

import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// Não relevantes para a aplicação
// router.get("/", userController.index);
// router.get("/:id", userController.show);

router.post("/", loginRequired, userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;

/*
Em cada controller até 5 métodos por padrão de mercado, mesmo
listar -> index -> get
criar um usuário -> store/create -> post
apagar um usuário -> delete -> delete
mostrar um usuário -> show -> get
atualizar um usuário -> update -> patch/put
*/
