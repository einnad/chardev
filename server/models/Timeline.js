import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  name: String,
  characters: String,
  one: String,
  two: String,
  three: String,
  four: String,
  five: String,
  six: String,
  seven: String,
  eight: String,
  nine: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const timelineModel = mongoose.model("Timeline", timelineSchema);
export default timelineModel;
