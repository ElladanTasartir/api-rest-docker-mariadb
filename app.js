import dotenv from "dotenv";

dotenv.config();

import express from "express";
import homeRoutes from "./src/routes/home";
import userRoutes from "./src/routes/user";
import "./src/database"; // Vai ser executado automaticamente

// Estrutura de app com classes, só pra variar um pouco
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
  }
}

export default new App().app;
