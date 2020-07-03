"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio.",
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio.",
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_appConfig2.default.url}:${
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
} exports.default = Photo;
