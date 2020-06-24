import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";

const models = [Aluno, User]; // Array de models

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection)); // Iniciar conexão para cada array
