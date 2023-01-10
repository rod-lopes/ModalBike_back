require('dotenv').config()

const express = require("express");
const routes = require("./routes");
const cors = require("cors")
const multer = require("multer");
const path = require("path");
const { PORT } = require("./config/config")

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const app = express();
const port = 3000;

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

routes(app);
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "upload/")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ storage })

app.get('/', function (req, res) {
	res.render('../api/views/index.ejs');
});

app.post("/upload", upload.single("file"), (req, res) => {
	res.send("Arquivo Recebido!");
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT || port, () => console.log(`O servidor está rodando na porta ${PORT}\n`));

module.exports = app;
