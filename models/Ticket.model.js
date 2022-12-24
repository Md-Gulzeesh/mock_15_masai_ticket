const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Category: { type: String, required: true },
  Message: { type: String, required: true },
  Date_and_timestamp: { type: String, required: true },
  Bookmark:{type:Boolean,default:false}
});
const TicketModel = mongoose.model("mock_15_ticket", ticketSchema);

module.exports = { TicketModel };
