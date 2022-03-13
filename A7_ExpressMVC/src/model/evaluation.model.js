const mongoose = require("mongoose");

//---------------Evaluation Schema---------------//
const evaluationSchema = new mongoose.Schema(
    {
      date_of_evaluation: { type: "String", required: true },
      instructor_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      batch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
);
const Evaluation = mongoose.model("evaluation",evaluationSchema);

module.exports = Evaluation;