const mongoose = require('mongoose');
const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BorrowerController {

  static async getAll(req, res) {
    try {
      const borrowers = await DB.Borrower.find()
        .populate('borrowHistory', 'bookId borrowDate dueDate status');

      return ResponseHelper.success(res, borrowers);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const borrower = await DB.Borrower.findById(req.params.id)
        .populate('borrowHistory', 'bookId borrowDate dueDate status'); 
      
      if (!borrower) {
        return ResponseHelper.error(res, 'Borrower not found', 404);
      }
      
      return ResponseHelper.success(res, borrower);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async create(req, res) {
    try {
      const newBorrower = await DB.Borrower.create(req.body); // Menggunakan `req.body` untuk data borrower baru
      return ResponseHelper.success(res, newBorrower, 'Borrower created successfully', 201);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      const updatedBorrower = await DB.Borrower.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedBorrower) {
        return ResponseHelper.error(res, 'Borrower not found', 404);
      }

      return ResponseHelper.success(res, updatedBorrower, 'Borrower updated successfully');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      const deletedBorrower = await DB.Borrower.findByIdAndDelete(req.params.id);

      if (!deletedBorrower) {
        return ResponseHelper.error(res, 'Borrower not found', 404);
      }

      return ResponseHelper.success(res, deletedBorrower, 'Borrower deleted successfully');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BorrowerController;
