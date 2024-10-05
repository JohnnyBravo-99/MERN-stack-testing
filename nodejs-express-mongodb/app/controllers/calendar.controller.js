import Event from "../models/calendar.model.js";

// Create and Save a new Event
export const create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    important: req.body.important,
    date: req.body.date,
    published: req.body.published,
    sharedWith: req.body.sharedWith || [],
  });

  event
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event."
      });
    });
};

// Retrieve all Events
export const findAll = (req, res) => {
  Event.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events."
      });
    });
};

// Share an Event
export const share = (req, res) => {
  const eventId = req.params.id;
  const userId = req.body.userId;

  Event.findByIdAndUpdate(
    eventId,
    { $addToSet: { sharedWith: userId } }, // Add userId to sharedWith array if not already present
    { new: true }
  )
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot share Event with id=${eventId}. Maybe Event was not found!` });
      } else res.send({ message: "Event was shared successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error sharing Event with id=" + eventId
      });
    });
};