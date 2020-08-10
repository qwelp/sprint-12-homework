const fs = require('fs');
const path = require('path');
const cardsRouter = require('express').Router();

const cardsFile = path.join(__dirname, '../data/cards.json');

fs.access(cardsFile, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    cardsRouter.use('/', (req, res) => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
  } else {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const cardsItems = require(cardsFile);
    cardsRouter.get('/', (req, res) => {
      res.send(cardsItems);
    });
  }
});

module.exports = cardsRouter;
