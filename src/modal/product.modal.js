import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    VenuName: { type: String, required: true },
    description: { type: String, required: true },
    // pic: { type: [String], required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["farm house", "hall", "banquet", "villas", "murqee", "resturant"],
      required: true,
    },

    pics: {
      type: [String],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    standingCapacity: {
      type: Number,
      required: true,
    },
    seatedCapacity: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    features: {
      swimmingPool: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      secuirty: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      bbqArea: { type: Boolean, default: false },
      airCondition: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
