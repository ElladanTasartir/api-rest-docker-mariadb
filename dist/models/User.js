"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              // Valida o tamanho do campo
              args: [3, 255], // tamanho mínimo e máximo
              msg: "Campo nome deve ter entre 3 e 255 caracteres", // mensagem caso o erro seja disparado
            },
          },
        },
        // Sequelize utiliza o validator, portanto tudo o que tem no validate pode user usado pro lá também
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "A senha precisa ter entre 6 e 50 caracteres",
            },
          },
        }, // Campo não existe na base de dados, vamos usar para validação
      },
      {
        sequelize,
      }
    );
    // Adicionamos um hook para quando alguma ação acontecer, esse ser disparado
    this.addHook("beforeSave", async (user) => {
      // Preenchemos o password_hash com os dados enviados no user.password
      // Segundo parâmetro é o salt

      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
