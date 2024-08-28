import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  rawText: {
    type: String,
    required: true,
  },
  summarizedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
