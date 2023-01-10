const database = require("../models");

class BicicletaController {
	static async pegaTodasAsBicicletas(req, res) {
		try {
			const todasAsBicicletas = await database.bicicletas.findAll();
			return res.status(200).json(todasAsBicicletas);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async pegaUmaBicicleta(req, res) {
		const { id } = req.params;
		try {
			const umaBicicleta = await database.bicicletas.findOne({
				where: {
					id: Number(id),
				},
			});
			return res.status(200).json(umaBicicleta);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async criaBicicleta(req, res) {
		const { numero, colaborador_id, status } = req.body;
		try {
			const bicicletaExiste = await database.bicicletas.findOne({
				where: {
					numero: numero,
				},
			})
			if (bicicletaExiste) {
				return res.status(400).json({ mensagem: `Número de Bicicleta Já Cadastrada no sistema.`})
			}

			const numeroBicicleta = numero.toString();
			const tamanhoBicicleta = numeroBicicleta.length;

			if (tamanhoBicicleta != 4) {
				return res.status(400).json({ mensagem: `Número de caracteres para bicicleta inválido.`})
			}

			const novaBicicletaCriada = await database.bicicletas.create({
				numero,
				colaborador_id,
				status
			});
			return res.status(200).json(novaBicicletaCriada);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async atualizaBicicleta(req, res) {
		const { id } = req.params;
		const novasInfos = req.body;
		try {

			const numeroBicicleta = novasInfos.numero.toString();
			const tamanhoBicicleta = numeroBicicleta.length;

			if (tamanhoBicicleta != 4) {
				return res.status(400).json({ mensagem: `Número de caracteres para bicicleta inválido`})
			}

			await database.bicicletas.update(novasInfos, {
				where: { id: Number(id) },
			});
			const bicicletaAtualizada = await database.bicicletas.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(bicicletaAtualizada);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async apagaBicicleta(req, res) {
		const { bicicletaId } = req.params;
		try {

			const bicicleta = await database.bicicletas.findOne({
				where: {
					id: Number(bicicletaId),
				},
			});

			const { colaborador_id } = bicicleta.dataValues




			if (colaborador_id === null) {
				await database.bicicletas.destroy({
					where: { id: Number(bicicletaId) },
				});
				return res.status(200).json({ mensagem: `Bicicleta removida com sucesso.`});
			} else {
				const colaborador = await database.colaboradores.findOne({
					where: {
						id: Number(colaborador_id),
					},
				});

				const { nome } = colaborador.dataValues
				return res.status(400).json({ mensagem: `Não é possível remover a bicicleta. Bicicleta em uso por  ${nome} .`})
			}
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

}

module.exports = BicicletaController;
