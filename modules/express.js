const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const CardModel = require('../src/models/cartao.model'); // Importe o modelo de cartão

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Middleware para analisar o corpo da solicitação como JSON
app.use(express.static('public')); //

app.set('view engine', 'ejs'); // Colocando como view o EJS!
app.set('views', 'src/views')

//VIEWS
app.get('/', async (req, res) => {
  try {
    const lastCard = await CardModel.getLastId();

    res.render('index', { lastCard });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na requisição');
  }
});

//END POINTS
// Rota para criar um novo cartão
app.post('/cards', async (req, res) => {
  try {
    const { saldo } = req.body;

    console.log('Received POST request with saldo:', saldo);

    if (saldo === undefined) {
      console.log('saldo is undefined');
      return res.status(400).json({ error: 'O campo "saldo" é obrigatório' });
    }

    const cardId = await CardModel.createCard(saldo);

    console.log('Card created with ID:', cardId);

    res.status(201).json({ id: cardId, saldo });
  } catch (error) {
    console.error('Erro ao criar o cartão:', error);
    res.status(500).json({ error: 'Erro ao criar o cartão' });
  }
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
