import { Router } from "express";

import userController from "../controllers/UserController";

const router = new Router();

router.post("/", userController.store);
router.get("/", userController.index);

export default router;

/*
Em cada controller até 5 métodos por padrão de mercado, mesmo
listar -> index -> get
criar um usuário -> store/create -> post
apagar um usuário -> delete -> delete
mostrar um usuário -> show -> get
atualizar um usuário -> update -> patch/put
*/
