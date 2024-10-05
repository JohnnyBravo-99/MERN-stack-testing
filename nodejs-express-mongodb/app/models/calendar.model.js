import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    important: Boolean,
    date: Date,
    published: Boolean,
    sharedWith: [String], // Array of user IDs with whom the event is shared
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
