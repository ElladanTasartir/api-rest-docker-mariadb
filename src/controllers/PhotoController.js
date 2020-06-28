import multer from "multer";

import multerConfig from "../config/multer";

import Photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      // para tratar os erros do multer. já executamos esas função do multer
      // para se um erro aparecer, ele será enviado no callback de err
      if (err) return res.status(400).json({ erros: [err.code] });
      // err.code porque é aqui que está a mensagem de erro enviada dentro do multerConfig

      try {
        const { originalname, filename } = req.file; // variável inserida pelo multer com os dados da foto

        const { aluno_id } = req.body;
        const photo = await Photo.create({ originalname, filename, aluno_id });

        return res.json(photo);
      } catch (err) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }
    });
    // arquivo que veio dentro da requisição
    // se fosse mais de um arquivo, seria req.files
    // dentro desse objeto, temos informações sobre o arquivo enviado
    // como, mimetype, nome original, nome criado pelo multer, path, size, etc
  }
}

export default new PhotoController();
