const { Router } = require("express");
const LancamentoController = require("../controllers/LancamentoController.js");
const { auth } = require("../middlewares/auth.js");
const { usuarioId } = require("../middlewares/usuarioId.js");
const { usuarioColaborador } = require("../middlewares/usuarioColaborador.js");


const router = Router();

router.get("/lancamentos", auth,LancamentoController.pegaTodosOsLancamento);
router.get("/lancamentos/:id", usuarioColaborador, LancamentoController.pegaUmLancamento);
router.get("/lancamento/:colaborador_id", usuarioId, LancamentoController.pegaLancamentosColaborador);
router.post("/lancamentos", usuarioColaborador, LancamentoController.criaLancamento);
router.put("/lancamentos/:id", usuarioColaborador,LancamentoController.atualizaLancamento);
router.delete("/lancamentos/:id", usuarioColaborador, LancamentoController.apagaLancamento);


module.exports = router;
