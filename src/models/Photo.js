import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio.",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio.",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}:${
              process.env.APP_PORT
            }/images/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
        tableName: "fotos",
      }
    ); // Um objeto contem os campos e o outro o sequelize
    return this;
  }

  static associate(models) {
    // Temos que executar esse associate em algum lugar, então vamos jogar no index
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
    //Esse model/tabela pertence à um aluno, com sua foreign key em aluno_id
    //Podemos fazer essa associação, tanto no filho quanto no pai
    //Se fizéssemos no pai (Aluno), faríamos assim:
    // this.hasOne(models.Photo, { foreignKey: 'aluno_id' });
  }
}
