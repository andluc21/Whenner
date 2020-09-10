var express = require('express');
var router = express.Router();

var Event = require("../models/events")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to the events API endpoint!")
});

router.get("/all", (req, res, next) => {

  Event.find({}, (err, events) => {

    if (err) {
      res.status(500)
      console.log(err)
      return res.send("An error was encountered while GETTING ALL calendar eventS")
    }
    
    res.json(events)
    
  })

})

router.post("/", (req, res, next) => {

  var newEvent = new Event(req.body);

  newEvent.save((err) => {

    if (err) {
      res.status(500)
      console.log(err)
      return res.send("An error was encountered while trying to save the calendar event")
    }

    res.json(newEvent)

  })

  

})

module.exports = router;
