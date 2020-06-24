import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
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
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }
}
