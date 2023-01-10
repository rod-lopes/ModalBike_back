const { Router } = require("express");
const BicicletaController = require("../controllers/BicicletaController.js");
const { auth } = require("../middlewares/auth.js");




const router = Router();


router.get("/bicicletas", auth, BicicletaController.pegaTodasAsBicicletas);
router.get("/bicicletas/:id", auth, BicicletaController.pegaUmaBicicleta);
router.post("/bicicletas", BicicletaController.criaBicicleta);
router.put("/bicicleta/:id", BicicletaController.atualizaBicicleta);
router.delete("/bicicleta/:bicicletaId", BicicletaController.apagaBicicleta);



module.exports = router;
