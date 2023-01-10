const database = require("../models");

class LancamentoController {
  static async pegaTodosOsLancamento(req, res) {
    try {
      const todosOsLancamentos = await database.lancamentos.findAll();
      return res.status(200).json(todosOsLancamentos);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async pegaUmLancamento(req, res) {
    const { id } = req.params;
    try {
      const umLancamento = await database.lancamentos.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(umLancamento);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async pegaLancamentosColaborador(req, res) {
    const { colaborador_id } = req.params;
    try {
      const LancamentosColaborador = await database.lancamentos.findAll({
        where: {
          colaborador_id: Number(colaborador_id),
        },
      });
      return res.status(200).json(LancamentosColaborador);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async criaLancamento(req, res) {
    const novoLancamento = req.body;

    const media = novoLancamento.km / novoLancamento.tempo;
    const km = novoLancamento.km;
    const tempo = novoLancamento.tempo;

    if (km <= 100 && tempo <= 10) {
      if (media <= 40) {

        try {

          const novoLancamentoCriado = await database.lancamentos.create(
            novoLancamento
          );
          return res.status(200).json(novoLancamentoCriado);
        } catch (error) {
          return res.status(500).json({ mensagem: `${error.message}`});
        }

      } else {
        return res.status(500).json({ mensagem: `Média de velocidade acima do permitido. Valor de KM ou Tempo incoerentes`});
      }

    } else {
      return res.status(500).json({ mensagem: `Valor de KM ou Tempo Superior ao permitido.`});

    }

  }

  static async atualizaLancamento(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    const media = novasInfos.km / novasInfos.tempo;
    const km = novasInfos.km;
    const tempo = novasInfos.tempo;

    if (km <= 100 && tempo <= 10) {
      if (media <= 40) {
        try {
          await database.lancamentos.update(novasInfos, {
            where: { id: Number(id) },
          });
          const lancamentoAtualizado = await database.lancamentos.findOne({
            where: { id: Number(id) },
          });
          return res.status(200).json(lancamentoAtualizado);
        } catch (error) {
          return res.status(500).json({ mensagem: `${error.message}`});
        }
      } else {
        return res.status(500).json({ mensagem: `Média de velocidade acima do permitido. Valor de KM ou Tempo incoerentes.`});
      }

    } else {
      return res.status(500).json({ mensagem: `Valor de KM ou Tempo Superior ao permitido.`});

    }

  }

  static async apagaLancamento(req, res) {
    const { id } = req.params;
    try {
      await database.lancamentos.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }
}

module.exports = LancamentoController;
