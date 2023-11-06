//IMPORTANDO MODULOS!
const dotenv = require('dotenv');
const connectToDatabase = require('./src/database/connect')

//CONFIGURANDO DOTENV
dotenv.config();

//CHAMANDO DATABASE
connectToDatabase();

// CHAMANDO O SERVIDOR
require("./modules/express")
