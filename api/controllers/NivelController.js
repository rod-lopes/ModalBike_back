const database = require("../models");

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await database.niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      const umNivel = await database.niveis.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(umNivel);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.niveis.create(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.niveis.update(novasInfos, { where: { id: Number(id) } });
      const nivelAtualizado = await database.niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params;
    try {
      await database.niveis.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}`});
    }
  }
}

module.exports = NivelController;
