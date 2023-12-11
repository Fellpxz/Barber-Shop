const connectToDatabase = require("../database/connect");

//----------------------------------------------------------------------------------

async function createCard(saldo, codigo) {
  const connection = await connectToDatabase();

  if (saldo === undefined || codigo === undefined) {
    return null; // Ou você pode lançar um erro ou lidar de outra forma
  }

  const [rows] = await connection.execute(
    "INSERT INTO cartoes (saldo, codigo) VALUES (?, ?)",
    [saldo, codigo]
  );

  await connection.end();
  return rows.insertId;
}

//----------------------------------------------------------------------------------

// Função para obter todos os cartões
async function getCards() {
  const connection = await connectToDatabase(); // Conecta ao banco de dados

  // Seleciona todos os registros da tabela 'cartoes'
  const [rows] = await connection.execute("SELECT * FROM cartoes");

  await connection.end(); // Encerra a conexão com o banco de dados
  return rows; // Retorna os registros de cartões
}

//----------------------------------------------------------------------------------

// Função para obter o saldo do último cartão
async function getSaldoOfLastId() {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    "SELECT saldo FROM cartoes ORDER BY id DESC LIMIT 1"
  );
  await connection.end();

  if (rows.length > 0) {
    return rows[0].saldo;
  }

  return 0; // Se nenhum registro for encontrado, retorne 0 ou outro valor padrão.
}

//----------------------------------------------------------------------------------

async function getLastCard() {
  const connection = await connectToDatabase();

  const [rows] = await connection.execute(
    "SELECT * FROM cartoes ORDER BY id DESC LIMIT 1"
  );

  await connection.end();
  return rows;
}

//----------------------------------------------------------------------------------

async function updateSaldo(novoSaldo) {
  const connection = await connectToDatabase();

  // Etapa 1: Obter o MAX(id)
  const [maxIdRows] = await connection.execute(
    "SELECT MAX(id) AS maxId FROM cartoes"
  );

  if (maxIdRows.length === 0 || maxIdRows[0].maxId === null) {
    throw new Error("Não foi possível obter o MAX(id) da tabela cartoes.");
  }

  const maxId = maxIdRows[0].maxId;

  // Etapa 2: Atualizar o saldo
  const [updateRows] = await connection.execute(
    "UPDATE cartoes SET saldo = ? WHERE id = ?",
    [novoSaldo, maxId]
  );

  await connection.end();

  return maxId;
}

//----------------------------------------------------------------------------------

// Função para adicionar saldo ao cartão pelo código
async function addSaldoByCodigo(codigo, saldo) {
  const connection = await connectToDatabase();

  const [rows] = await connection.execute(
    "UPDATE cartoes SET saldo = saldo + ? WHERE codigo = ?",
    [saldo, codigo]
  );

  await connection.end();
  return rows.affectedRows; // Retorna o número de linhas afetadas (deve ser 1 se o código existir)
}

//----------------------------------------------------------------------------------

// Função para excluir cartão pelo código
async function deleteCardByCodigo(codigo) {
  const connection = await connectToDatabase();

  const [rows] = await connection.execute(
    "DELETE FROM cartoes WHERE codigo = ?",
    [codigo]
  );

  await connection.end();
  return rows.affectedRows; // Retorna o número de linhas afetadas (deve ser 1 se o código existir)
}

//----------------------------------------------------------------------------------

// Exporta as funções para serem usadas em outros lugares
module.exports = {
  createCard,
  getCards,
  getSaldoOfLastId,
  updateSaldo,
  getLastCard,
  addSaldoByCodigo,
  deleteCardByCodigo,
};
