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
    status: {
      type: String,
      default: 'Uncompleted',
    },
    creator: {
      type: String,
      require: true,
    },
    completedBy: {
      type: String,
      default: '',
    },
    answer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
