// Importa o módulo para conectar ao banco de dados
const connectToDatabase = require("../database/connect");

// Função para obter os serviços
async function getServices() {
  const connection = await connectToDatabase(); // Conecta ao banco de dados

  // Seleciona todos os registros da tabela 'services'
  const [rows] = await connection.execute("SELECT * FROM services");

  await connection.end(); // Encerra a conexão com o banco de dados
  return rows; // Retorna os registros de serviços
}

// Função para obter os serviços de acordo com o ID.
async function getServicesById(serviceId) {
  const connection = await connectToDatabase(); // Conecta ao bando de dados

  const [rows] = await connection.execute(
    "SELECT * FROM services WHERE id = ?",
    [serviceId]
  );

  await connection.end(); // Encerra a conexão com o banco de dados

  if (rows.length === 0) {
    // Se nenhum serviço com o ID fornecido for encontrado, retorne null ou uma mensagem de erro adequada
    return null;
  }

  // Retorna o registro do serviço encontrado
  return rows[0];
}

// Exporta a função para ser usada em outros lugares
module.exports = {
  getServices,
  getServicesById,
};
