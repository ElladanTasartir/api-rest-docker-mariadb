import express from "express";

import homeRoutes from "./src/routes/home";
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
  }
}

export default new App().app;
