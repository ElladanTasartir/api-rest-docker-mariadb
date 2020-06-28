"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);

      const { id, nome, email } = novoUser;

      return res.json({ id, nome, email });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      // campos que serão exibidos
      const users = await _User2.default.findAll({ attributes: ["id", "nome", "email"] });
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id, {
        attributes: ["id", "nome", "email"],
      });
      return res.json(user);
    } catch (err) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      // pega o id vindo do payload para recuperar os dados

      if (!user)
        return res.status(400).json({
          erros: ["Usuário não existe"],
        });

      const newUser = await user.update(req.body);

      const { id, nome, email } = newUser;

      return res.json({ id, nome, email });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user)
        return res.status(400).json({
          erros: ["Usuário não existe"],
        });

      await user.destroy();

      return res.json(null);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

exports. default = new UserController();
