const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const CardModel = require("../src/models/cards.model");
const ServicesModel = require("../src/models/services.model");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Middleware para analisar o corpo da solicitação como JSON
app.use(express.static("public"));

// Configuração da view
app.set("view engine", "ejs"); // Configura a view para EJS
app.set("views", "src/views");

// Rotas para views
app.get("/", async (req, res) => {
  try {
    const saldo = await CardModel.getSaldoOfLastId();
    const services = await ServicesModel.getServices();

    res.render("index", { saldo, services });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro na requisição");
  }
});

// Rota para obter um serviço pelo ID
app.get("/services/:id", async (req, res) => {
  try {
    const serviceId = req.params.id; // Obtém o ID do serviço a partir dos parâmetros da rota
    const service = await ServicesModel.getServicesById(serviceId); // Chama a função para obter o serviço

    if (service) {
      res.json(service); // Retorna o serviço encontrado como JSON
    } else {
      res.status(404).json({ error: "Serviço não encontrado" }); // Retorna um erro se o serviço não for encontrado
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na requisição" });
  }
});

// Rota para atualizar o saldo do cartão após uma compra
app.post("/update-saldo", async (req, res) => {
  try {
    const novoSaldo = req.body.novoSaldo; // Obtenha o novo saldo da solicitação POST
    await CardModel.updateSaldo(novoSaldo); // Chame a função para atualizar o saldo

    res.status(200).json({ message: "Saldo atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o saldo" });
  }
});

// Endpoints
app.post("/cards", async (req, res) => {
  try {
    const { saldo } = req.body;

    console.log("Received POST request with saldo:", saldo);

    if (saldo === undefined) {
      console.log("saldo is undefined");
      return res.status(400).json({ error: 'O campo "saldo" é obrigatório' });
    }

    const cardId = await CardModel.createCard(saldo);

    console.log("Card created with ID:", cardId);

    // Redireciona de volta para a página "/"
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao criar o cartão:", error);
    res.status(500).json({ error: "Erro ao criar o cartão" });
  }
});

app.post("/comprar-servico/:serviceId", async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await ServicesModel.getServicesById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    const price = parseFloat(service.preco);

    // Tente recuperar o saldo do banco de dados
    let saldo = parseFloat(await CardModel.getSaldoOfLastId());

    // Verifique se o saldo é um número válido
    if (isNaN(saldo)) {
      console.error("Erro ao recuperar saldo do banco de dados.");
      return res.status(500).json({ error: "Erro ao recuperar saldo" });
    }

    console.log("serviceId:", serviceId);
    console.log("price:", price);
    console.log("saldo:", saldo);

    if (saldo < price) {
      console.log("Saldo insuficiente. Saldo:", saldo, "Preço:", price);
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    const novoSaldo = saldo - price;
    await CardModel.updateSaldo(novoSaldo);

    console.log("Novo saldo após compra:", novoSaldo);

    res.status(200).json({ saldo: novoSaldo });
  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).json({ error: "Erro na requisição" });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
