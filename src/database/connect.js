const mysql = require('mysql2/promise');

// Função para criar uma conexão assíncrona
async function connectToMySQL() {
  try {
    // Configurações da conexão com o MySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'barber_database'
    });

    console.log('Conectado ao MySQL de forma assíncrona!');

    // Realize a consulta ao banco de dados
    // Exiba os resultados da consulta

    // Encerre a conexão quando não for mais necessária
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao MySQL de forma assíncrona:', error);
  }
}

// Chame a função para iniciar a conexão
module.exports = connectToMySQL;
