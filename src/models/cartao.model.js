const connectToDatabase = require('../database/connect');


// Função para criar um novo cartão
async function createCard(saldo) {
  const connection = await connectToDatabase();

  // Replace undefined values with null
  if (saldo === undefined) {
    saldo = null;
  }

  const [rows] = await connection.execute(
    'INSERT INTO cartoes (saldo) VALUES (?)',
    [saldo]
  );

  await connection.end();
  return rows.insertId; // Retorna o ID do novo cartão
}


async function getCards() {
    const connection = await connectToDatabase();
  
    const [rows] = await connection.execute('SELECT * FROM cartoes');
  
    await connection.end();
    return rows;
  }

async function getLastId(){
  const connection = await connectToDatabase();

  const [rows] = await connection.execute('SELECT saldo FROM cartoes WHERE id = (SELECT MAX(id) FROM cartoes)');

  await connection.end();
  return rows;
}
  
module.exports = {
  createCard,
  getCards,
  getLastId,
};
