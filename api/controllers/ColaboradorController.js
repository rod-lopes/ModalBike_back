const database = require("../models");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {isJwtExpired} = require('jwt-check-expiration')
const secret = require("../config/secret")
const emails = require("../config/emails");
const { extname, resolve } = require("path");

class ColaboradorController {
	static async pegaTodosOsColaboradores(req, res) {

		try {
			
			const todosOsColaboradores = await database.colaboradores.findAll();

			async function obterBikePorColaboradorId(id) {
				const bike = await database.bicicletas.findOne({
					where: {
						colaborador_id: Number(id)
					}
				})
				return bike ? bike.dataValues : null
			}

			const novaLista = []
			for (let colaborador of todosOsColaboradores) {
				let { id } = colaborador.dataValues
				const props = colaborador.dataValues
				delete props.senha

				const bike = await obterBikePorColaboradorId(id)
				colaborador = {
					...props, bike
				}
				novaLista.push(colaborador)
			};

			return res.status(200).json(novaLista);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async pegaUmColaborador(req, res) {
		const { id } = req.params;
		try {
			let colaborador = await database.colaboradores.findOne({
				where: {
					id: Number(id),
				},
			});

			let bike = await database.bicicletas.findOne({
				where: {
					colaborador_id: Number(colaborador.id)
				}
			})

			bike = bike ? bike.dataValues : null;

			const propriedades = colaborador.dataValues
			delete propriedades.senha
			colaborador = {
				...propriedades, bike
			}

			return res.status(200).json(colaborador);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async criaColaborador(req, res) {
		const { nome, email, senha, data_registro, ativo, nivel_id } = req.body;
		try {
			const usuarioExiste = await database.colaboradores.findOne({
				where: {
					email: email,
				},
			})

			const nomeColaborador = nome;
			const emailColaborador = email;
			const senhaColaborador = senha;
			const registro = Date.parse(data_registro);


			const date = new Date();
			const hoje = Date.parse(date);

			if (registro > hoje) {
				return res.status(500).json({ mensagem: `${error.message}`});
			}

			if (senhaColaborador.length < 6 || senhaColaborador.length > 128) {
				return res.status(400).json({ mensagem: `A senha deve conter no mínimo 6 caracteres.`})
			}

			if (nomeColaborador.length < 3 || nomeColaborador.length > 128) {
				return res.status(400).json({ mensagem: `O nome deve conter no mínimo 3 caracteres.`})
			}

			const nomeSeparado = nome.split(" ");

			if (nomeSeparado.length < 2) {
				return res.status(400).json({ mensagem: `Preencha o seu sobrenome.`})
			}

			const localizar = emailColaborador.indexOf("@modalgr.com.br")

			if (localizar < 0) {
				return res.status(400).json({ mensagem: `Email não disponível para cadastro.`})
			}

			if (usuarioExiste) {
				return res.status(400).json({ mensagem: `Email Já Cadastrado no sistema.`})
			}
			const hashSenha = await bcrypt.hashSync(senha, 10)
			const Aguardando = 3;

			const novoColaboradorCriado = await database.colaboradores.create({
				nome,
				email,
				senha: hashSenha,
				data_registro,
				ativo,
				nivel_id: Aguardando
			});

			let propriedades = novoColaboradorCriado.dataValues
			delete propriedades.senha

			emails.enviaEmail(novoColaboradorCriado).catch(console.log);
			return res.status(200).json(novoColaboradorCriado);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async atualizaColaborador(req, res) {
		const { id } = req.params;
		let novasInfos = req.body;
		try {
			const nomeColaborador = novasInfos.nome;
			const emailColaborador = novasInfos.email;
			const senhaColaborador = novasInfos.senha;

			if (nomeColaborador.length < 3 || nomeColaborador.length > 128) {
				return res.status(400).json({ mensagem: `O nome deve conter no mínimo 3 caracteres.`})
			}
			const nomeSeparado = nomeColaborador.split(" ");

			if (nomeSeparado.length < 2) {
				return res.status(400).json({ mensagem: `Preencha o seu sobrenome.`})
			}
			const localizar = emailColaborador.indexOf("@modalgr.com.br")

			if (localizar < 0) {
				return res.status(400).json({ mensagem: `Email não disponível para cadastro.`})
			}

			if (senhaColaborador && (senhaColaborador.length < 6 || senhaColaborador.length > 128)) {
				return res.status(400).json({ mensagem: `A senha deve conter no mínimo 6 caracteres.`})
			} else if (!senhaColaborador) {
				delete novasInfos.senha
			} else if (senhaColaborador) {
				const hashSenha = await bcrypt.hashSync(senhaColaborador, 10)
				novasInfos = {
					...novasInfos, senha: hashSenha
				}
			}
			await database.colaboradores.update(novasInfos, {
				where: { id: Number(id) },
			});
			const colaboradorAtualizado = await database.colaboradores.findOne({
				where: { id: Number(id) },
			});
			let propriedades = colaboradorAtualizado.dataValues
			delete propriedades.senha


			let bike = await database.bicicletas.findOne({
				where: {
					colaborador_id: Number(propriedades.id)
				}
			})

			bike = bike ? bike.dataValues : null;

			propriedades = {
				...propriedades, bike
			}
			return res.status(200).json(propriedades);
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async apagaColaborador(req, res) {
		const { colaboradorId } = req.params;
		try {
			await database.colaboradores.destroy({
				where: { id: Number(colaboradorId) },
			});
			return res.status(200).json({ mensagem: `id ${colaboradorId} deletado` });
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async login(req, res) {
		const { email, senha, ativo } = req.body;
		try {
			let colaborador = await database.colaboradores.findOne({
				where: {
					email: email,
				},
			})
			if (!colaborador) {
				return res.status(400).json({ mensagem: `O email não existe.`})
			}

			const verificaSenha = await bcrypt.compare(senha, colaborador.senha)

			if (!verificaSenha) {
				return res.status(400).json({ mensagem: `Email ou senha inválidos.`});
			}

			const estaAtivo = await database.colaboradores.findOne({
				where: {
					email: email,
					ativo: 1,
				},
			})
			if (!estaAtivo) {
				return res.status(400).json({ mensagem: `O usuário está inativo.`})
			}

			let bike = await database.bicicletas.findOne({
				where: {
					colaborador_id: Number(colaborador.id)
				}
			})

			bike = bike ? bike.dataValues : null;

			colaborador = {
				...colaborador.dataValues, bike
			}


			let token = jwt.sign({ id: colaborador.id }, secret.secret, {
				//expiresIn: 600 // Token expira em 10min
				//expiresIn: '1h' // Token expira em 1 hora
				expiresIn: '2h' // Token expira em 1 minuto
			})

			let tokendados = jwt.sign(colaborador, secret.secret, {
				//expiresIn: 600 // Token expira em 10min
				expiresIn: '2h'// Token expira em 1 hora
			})

			return res.status(200).json({
				mensagem: `Colaborador(a) logado.`,
				colaborador: tokendados,
				token: token

			});
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async liberaColaborador(req, res) {
		const { id } = req.params;
		const nivel_id = req.body;
		try {
			await database.colaboradores.update(nivel_id, {
				where: { id: Number(id) },
			});
			const colaboradorLiberado = await database.colaboradores.findOne({
				where: { id: Number(id) },
			});
			const propriedades = colaboradorLiberado.dataValues
			delete propriedades.senha
			if (nivel_id.nivel_id != 3) {
				emails.emailLiberacao(colaboradorLiberado).catch(console.log);
				return res.status(200).json(propriedades);
			} else {
				return res.status(400).json({ mensagem: `Impossível liberar o acesso, pois o nível não é aceito.`})
			}
		} catch (error) {
			return res.status(500).json({ mensagem: `${error.message}`});
		}
	}

	static async imagemAvatar(req, res) {
		const { filename: imagem_avatar } = req.file;
		const { id } = req.params;
		const colaborador = await database.colaboradores.findOne({
			where: { id: Number(id) },
		});

		if (extname(imagem_avatar) != '.jpg' && extname(imagem_avatar) != '.png') {
			return res.status(400).json({ mensagem: `Imagem deve ser .jpg ou .png`})
		} else {

			const dadosUsuario = await colaborador.update({ imagem_avatar })

			return res.json({ avatar: `Imagem alterada com sucesso` });
		}
	}



}

module.exports = ColaboradorController;
