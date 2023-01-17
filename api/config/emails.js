require('dotenv').config()
const nodemailer = require('nodemailer');
const user = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;


async function enviaEmail(novoColaboradorCriado) {
    const transportador = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user,
            pass: password
        }
    });


    const info = await transportador.sendMail({
        from: `"BikeGR"<${user}>`,
        to: novoColaboradorCriado.email,
        subject: 'Seja Bem Vindo ao Sistema BikeGR!',
        text: "Olá! Seja Bem vindo!",
        html:
            '<h1> Olá ' + novoColaboradorCriado.nome + ' Seja Muito Bem Vindo ao Sistema BikeGR! </h1><p>Você acaba de se registrar no sistema.</p><br><br> <p>Estaremos providenciando sua bicicleta e providenciaremos toda a documentação necessária para que você possa utilizá-la</p> <p>Após este processo entregaremos a sua bicicleta e você já poderá registrar os seus lançamentos.</p><br><br><p>A equipe <b>BikeGR</b> agradece seu interesse :)</p><br><br> '
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}

async function emailLiberacao(colaboradorLiberado) {
    const transportador = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user,
            pass: password
        }
    });


    const info = await transportador.sendMail({
        from: `"BikeGR" <${user}>`,
        to: colaboradorLiberado.email,
        subject: 'O seu acesso ao sistema BikeGR está liberado.',
        text: "Olá! Bicicleta Liberada!",
        html:
            '<h1> Olá ' + colaboradorLiberado.nome + ' Seu acesso ao sistema já está liberado para lançamentos.</h1><p>Agora você já poderá acessar o sistema e realizar os seus lançamentos.</p><br><br><p>A equipe <b>BikeGR</b> agradece seu interesse :)</p><br><br>'

    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}


module.exports = { enviaEmail, emailLiberacao }