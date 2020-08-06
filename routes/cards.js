const cardsRouter = require('express').Router();
const cardsItems = require('../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  res.send(cardsItems);
});

module.exports = cardsRouter;