const express = require('express');
const BookStockController = require('../controllers/bookstock_controller');

const bookstockRouter = express.Router();

bookstockRouter.get('/bookstocks', BookStockController.getAll);
bookstockRouter.get('/bookstock/:id', BookStockController.getById);
bookstockRouter.post('/bookstock', BookStockController.create);
bookstockRouter.put('/bookstock/:id', BookStockController.update);
bookstockRouter.delete('/bookstock/:id', BookStockController.delete);

module.exports = bookstockRouter;