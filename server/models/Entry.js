const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  travelDate: { type: Date, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Entry", entrySchema);
