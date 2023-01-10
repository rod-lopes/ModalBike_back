const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer.js")

const { login } = require("../controllers/ColaboradorController.js");
const ColaboradorController = require("../controllers/ColaboradorController.js");
const { auth } = require("../middlewares/auth.js");
const {meusdados} = require("../middlewares/meusdados.js");
const {usuarioId} = require("../middlewares/usuarioId.js");

const router = Router();

const upload = multer(multerConfig);

router.get("/colaboradores", auth, ColaboradorController.pegaTodosOsColaboradores);
router.get("/colaboradores/:id", meusdados, ColaboradorController.pegaUmColaborador);
router.post("/colaboradores", ColaboradorController.criaColaborador);
router.put("/colaborador/:id", meusdados, ColaboradorController.atualizaColaborador);
router.put("/liberar/:id", auth, ColaboradorController.liberaColaborador);
router.delete("/colaborador/:colaboradorId", auth, ColaboradorController.apagaColaborador);
router.post("/login", ColaboradorController.login);

router.put('/avatar/:id', meusdados, upload.single('file'), ColaboradorController.imagemAvatar);



module.exports = router;
