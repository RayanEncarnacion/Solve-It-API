const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    urgency: {
      type: String,
      default: 'Normal',
    },
    type: {
      type: String,
      require: true,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Uncompleted',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
