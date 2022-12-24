const express = require("express");
const { TicketModel } = require("../models/Ticket.model");
const ticketRouter = express.Router();


ticketRouter.get("/",async(req,res)=>{
    try {
        let tickets = await TicketModel.find();
        res.send(tickets);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
})
ticketRouter.get("/bookmarks", async (req, res) => {
  const tickets = await TicketModel.find({ Bookmark: true });
  res.send(tickets);
});
ticketRouter.post("/create",async(req,res)=>{
    try {
        let Date_and_timestamp = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        req.body.Date_and_timestamp = Date_and_timestamp;
        await TicketModel.insertMany([req.body]);
        res.send("Ticket created");
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
})
ticketRouter.post("/bookmark/:id",async(req,res)=>{
    TicketModel.findById(req.params.id, async (err) => {
      if (err) {
        res
          .status(404)
          .send(`Ticket with id ${req.params.id} not found`);
      } else {
        await TicketModel.where({ _id: req.params.id }).updateOne(
          req.body
        );
        res.send(
          `Ticket with id ${req.params.id} bookmarked successfully`
        );
      }
    });
})

ticketRouter.get("/sort", async (req, res) => {
  let query = req.query.sort;
  if (query !== undefined) {
    if (query === "SortBylatest") {
      let tickets = await TicketModel.find({}).sort({
        Date_and_timestamp: -1,
      });
        res.send(tickets);
    } else {
      let tickets = await TicketModel.find({}).sort({ Date_and_timestamp: 1 });
        res.send(tickets);
    }
  } else {
    res.status(500).send("Please add query");
  }
});

ticketRouter.get("/filter", async (req, res) => {
  let query = req.query.category;
  if (query !== undefined) {
    let tickets = await TicketModel.find({ Category: query });
      res.send(tickets);
  } else {
    res.status(500).send("Please add filter");
  }
});




module.exports = { ticketRouter };