const express = require('express');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(__dirname + '/public'));

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
