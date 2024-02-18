import { Schema, model } from "mongoose";

const QueueSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Queue = model("Queue", QueueSchema);
export default Queue;
