import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    type: {
      type: String,
      enum: ["farm house", "hall", "banquet", "villas", "murqee", "resturant"],
      required: true,
    },
    totalGuest: { type: Number, required: true },
    message: { type: String },
    contactNumber: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookingDate: { type: Date, required: true },

    // General Booking Info
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid", "refunded"],
      default: "unpaid",
    },
    advancePaid: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    specialRequests: { type: String },
    // occasion: { type: String }, // e.g., Wedding, Birthday, Corporate Event

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "cancelled", "completed"],
    },
    isCancel: { type: Boolean, default: false },
    cancellationReason: { type: String },

    // 🔹 Farm House specific fields
    farmHouseDetails: {
      poolAccess: { type: Boolean },
      overNightStay: { type: Boolean },
      cateringIncluded: { type: Boolean },
      numberOfRooms: { type: Number },
      numberOfBeds: { type: Number },
      kitchen: { type: Boolean },
      parking: { type: Boolean },
      wifi: { type: Boolean },
      generator: { type: Boolean },
      securityGuard: { type: Boolean },
      barbecueArea: { type: Boolean }, // 🆕 new
      playArea: { type: Boolean }, // 🆕 new
    },

    // 🔹 Banquet specific fields
    banquetDetails: {
      guestCapacity: { type: Number },
      cateringService: { type: Boolean },
      // menuTypes: [{ type: String }],
      inHouseDecoration: { type: Boolean },
      stageAvailable: { type: Boolean },
      djMusic: { type: Boolean },
      valetParking: { type: Boolean },
      changingRoom: { type: Boolean },
      // eventTypesAllowed: [{ type: String }],
      acAvailable: { type: Boolean },
      projectorAvailable: { type: Boolean }, // 🆕 new
      photographyService: { type: Boolean }, // 🆕 new
    },

    // 🔹 Villas specific fields
    villaDetails: {
      floors: { type: Number },
      bedrooms: { type: Number },
      bathrooms: { type: Number },
      privatePool: { type: Boolean },
      kitchenType: { type: String, enum: ["open", "closed", "shared"] },
      maidService: { type: Boolean },
      gardenArea: { type: Boolean }, // 🆕 new
      gymAccess: { type: Boolean }, // 🆕 new
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
