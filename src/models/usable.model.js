const connectToDatabase = require("../database/connect");

async function getAllUtilizaveis() {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.execute("SELECT * FROM utilizaveis");
    return rows;
  } catch (error) {
    console.error("Erro ao obter todos os utilizaveis:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function deleteUtilizavel(itemId) {
  const connection = await connectToDatabase();

  try {
    await connection.execute("DELETE FROM utilizaveis WHERE ID = ?", [itemId]);
  } catch (error) {
    console.error(`Erro ao excluir utilizável do banco de dados: ${error}`);
    throw error;
  } finally {
    await connection.end();
  }
}

async function insertUtilizavel(nome, tipo) {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO utilizaveis (Nome, Tipo) VALUES (?, ?)",
      [nome, tipo]
    );

    return rows.insertId;
  } catch (error) {
    console.error("Erro ao inserir utilizável:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = {
  getAllUtilizaveis,
  deleteUtilizavel,
  insertUtilizavel,
};
