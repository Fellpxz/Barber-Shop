const connectToDatabase = require("../database/connect");

async function insertRewardOne() {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO utilizaveis (Nome, Tipo) VALUES (?, ?)",
      ["Hidratação Capilar", "Recompensa"]
    );

    return rows.insertId;
  } catch (error) {
    console.error("Erro ao inserir recompensa um:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function insertRewardTwo() {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO utilizaveis (Nome, Tipo) VALUES (?, ?)",
      ["Produtos de Barba ou Cabelo", "Recompensa"]
    );

    return rows.insertId;
  } catch (error) {
    console.error("Erro ao inserir recompensa dois:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function insertRewardThree() {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.execute(
      "INSERT INTO utilizaveis (Nome, Tipo) VALUES (?, ?)",
      ["Serviço Bônus", "Recompensa"]
    );

    return rows.insertId;
  } catch (error) {
    console.error("Erro ao inserir recompensa três:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = {
  insertRewardOne,
  insertRewardTwo,
  insertRewardThree,
};
