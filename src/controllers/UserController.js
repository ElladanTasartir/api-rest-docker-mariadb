import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      console.log(req.userId, req.userEmail);
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (err) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Id não enviado"] });

      const user = await User.findByPk(id);

      if (!user)
        return res.status(400).json({
          erros: ["Usuário não existe"],
        });

      const newUser = await user.update(req.body);

      return res.json(newUser);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Id não enviado"] });

      const user = await User.findByPk(id);

      if (!user)
        return res.status(400).json({
          erros: ["Usuário não existe"],
        });

      await user.destroy();

      return res.json(user);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new UserController();
