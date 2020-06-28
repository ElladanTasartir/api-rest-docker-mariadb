import multer from "multer";
import { resolve, extname } from "path";

const aleatorio = () => {
  return Math.floor(Math.random() * 10000 + 10000);
};

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("Arquivo precisa ser PNG ou JPG."));
    }

    return cb(null, true); // retorna sem erro e vai para a próxima função
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // recebe a requisição, um arquivo e um callback
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
      // primeiro parâmetro é um erro, então podemos enviar null para sucesso
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
      //extname recebe o arquivo/nome do arquivo e extrai a extensão
    },
  }),
};
