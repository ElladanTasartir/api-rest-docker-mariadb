import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Photo from "../models/Photo";

const models = [Aluno, User, Photo]; // Array de models
// Todo model precisa ser colocado nesse array de models

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection)); // Iniciar conexão para cada array
// Se o model possuir o método model.associate, exectuará ele passando os models presentes no banco
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
