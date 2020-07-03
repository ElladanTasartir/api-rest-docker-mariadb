import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import homeRoutes from "./routes/home";
import userRoutes from "./routes/user";
import tokenRoutes from "./routes/token";
import alunoRoutes from "./routes/aluno";
import photoRoutes from "./routes/photo";
import "./database"; // Vai ser executado automaticamente

const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    // Na origin vem o domnínio que estiver tentando acessar a API
    // Se não for enviado, vem como undefined
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // recebe como primeiro parâmetro um erro
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Estrutura de app com classes, só pra variar um pouco
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "..", "uploads")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/photos", photoRoutes);
  }
}

export default new App().app;
