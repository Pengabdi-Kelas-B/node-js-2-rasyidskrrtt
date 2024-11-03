const mongoose = require('mongoose');
const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BookStockController {
    static async getAll(req, res) {
        try {
            const bookStocks = await DB.BookStock.find().populate('bookId', 'title');
            return ResponseHelper.success(res, bookStocks);
        } catch (error) {
            return ResponseHelper.error(res, error.message);
        }
    }

    static async getById(req, res) {
        try {
            const bookStock = await DB.BookStock.findById(req.params.id).populate('bookId', 'title');
            if (!bookStock) {
                return ResponseHelper.error(res, 'Book Stock not found', 404);
            }
            return ResponseHelper.success(res, bookStock);
        } catch (error) {
            return ResponseHelper.error(res, error.message);
        }
    }

    static async create(req, res) {
        try {
            const { bookId, totalQuantity } = req.body;
            const existingBookStock = await DB.BookStock.findOne({ bookId });

            if (existingBookStock) {
                return ResponseHelper.error(res, 'Book stock already exists for this book', 400);
            }

            const newBookStock = await DB.BookStock.create(req.body);
            return ResponseHelper.success(res, newBookStock, 'Book stock created successfully', 201);
        } catch (error) {
            return ResponseHelper.error(res, error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updatedBookStock = await DB.BookStock.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedBookStock) {
                return ResponseHelper.error(res, 'Book Stock not found', 404);
            }
            return ResponseHelper.success(res, updatedBookStock, 'Book stock updated successfully');
        } catch (error) {
            return ResponseHelper.error(res, error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedBookStock = await DB.BookStock.findByIdAndDelete(id);
            if (!deletedBookStock) {
                return ResponseHelper.error(res, 'Book Stock not found', 404);
            }
            return ResponseHelper.success(res, null, 'Book stock deleted successfully');
        } catch (error) {
            return ResponseHelper.error(res, error.message);
        }
    }
}

module.exports = BookStockController;
