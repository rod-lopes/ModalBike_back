const jwt = require('jsonwebtoken');
const { isJwtExpired } = require('jwt-check-expiration')
const database = require("../models");
const { promisify } = require('util')
const secret = require("../config/secret")


module.exports = {


    usuarioId: async function (req, res, next) {
        const authHeader = req.headers.authorization;
        const id_params = req.params.id;
        if (!authHeader) {
            return res.status(400).json({
                mensagem: `Falta o token`
            })
        }
        const [, token] = authHeader.split(' ');
        if (!token) {
            return res.status(400).json({
                mensagem: `Falta o Token.`
            })
        }
       // if (isJwtExpired(token) === false) {
            try {
                const payload = jwt.verify(token, secret.secret)
                const { id } = payload

                let colaborador = await database.colaboradores.findOne({
                    where: {
                        id: Number(id),
                    },
                })
                if (!colaborador) {
                    return res.status(400).json({
                        mensagem: `Colaborador não possui permissão.`
                    })
                }
                const id_nivel = colaborador.nivel_id
                const teste = await database.niveis.findOne({
                    where: {
                        id: Number(id_nivel),
                    },
                })

                if (teste.id > 2) {
                    return res.status(401).json({
                        mensagem: `Colaborador não possui permissão.`
                    })
                }
                if (id_params != colaborador.id) {

                    return res.status(401).json({
                        mensagem: `Você só pode visualizar seus dados.`
                    })
                }
            } catch (error) {
                if (typeof token !== 'string') {
                    throw new InvalidTokenError('Invalid token specified');
                }
                return res.status(400).json({
                    mensagem: `Token Inválido`
                })
            }
            next()
        // } else {
        //     return res.status(400).json({
        //         mensagem: `Token Expirado.`
        //     })
        // }
    }
}