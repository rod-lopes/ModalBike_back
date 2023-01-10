const { Router } = require("express");
const NivelController = require("../controllers/NivelController");
const { auth } = require("../middlewares/auth.js");

const router = Router();
router
  .get("/niveis", NivelController.pegaTodosOsNiveis)
  .get("/niveis/:id", auth, NivelController.pegaUmNivel)
  .post("/niveis", auth, NivelController.criaNivel)
  .put("/niveis/:id", auth, NivelController.atualizaNivel)
  .delete("/niveis/:id", auth, NivelController.apagaNivel);
module.exports = router;
