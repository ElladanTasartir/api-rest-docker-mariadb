import Aluno from "../models/Aluno";
import Photo from "../models/Photo";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "idade",
        "peso",
        "altura",
      ],
      include: {
        model: Photo,
        attributes: ["url", "filename"],
      },
      order: [
        ["id", "DESC"],
        [Photo, "id", "DESC"],
      ],
      // Um array dentro de um array, pois podemos ter mais de um tipo de ordenação
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ["Aluno não existe"] });

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "sobrenome",
          "email",
          "idade",
          "peso",
          "altura",
        ],
        include: {
          model: Photo,
          attributes: ["url", "filename"],
        },
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
        ],
      });

      if (!aluno) return res.status(400).json({ errors: ["Aluno não existe"] });

      return res.json(aluno);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ["Aluno não existe"] });

      await aluno.destroy();

      return res.json({ apagado: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new AlunoController();
