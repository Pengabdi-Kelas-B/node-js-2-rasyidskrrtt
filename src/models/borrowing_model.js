const mongoose = require('mongoose')

const BorrowingSchema = new mongoose.Schema({
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Borrower',
      required: true
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      default: null
    },
    lateFee: { //kalo mau atur ini pokoknya ada di return pada controllers
      type: Number,
      default: 0,
      min: 0 
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'RETURNED'],
      default: 'ACTIVE'
    }
  }, {
    timestamps: true
  });
  
  module.exports = BorrowingSchema