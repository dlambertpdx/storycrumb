const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  title: { type: String, required: true },
  idea: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = { Idea };
