const mongoose = require("mongoose");

//----------------Batch Schema-----------------------//
const batchSchema = mongoose.Schema(
    {
      batch_name: { type: "String", required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
);
const Batch = mongoose.model("batch",batchSchema);

module.exports = Batch;