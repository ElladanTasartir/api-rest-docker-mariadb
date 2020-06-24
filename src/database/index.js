import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";

const models = [Aluno]; // Array de models

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection)); // Iniciar conexão para cada array
