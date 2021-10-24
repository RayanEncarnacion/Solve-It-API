const mongoose = require('mongoose');
//
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
      required: true,
    },
    urgency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Uncompleted',
    },
    creator: {
      type: String,
      default: 'Engineer',
    },
    completedBy: {
      type: String,
    },
    answer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
