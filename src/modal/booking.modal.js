import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalGuest: { type: Number, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookingDate: { type: Date, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "cancelled"],
    },
    isCancel: { type: Boolean, default: false },
    cancellationReason: { type: String },
    vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
