import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../modal/booking.modal.js";
import { Product } from "../modal/product.modal.js";
import { User } from "../modal/user.modal.js";
const createBooking = asyncHandler(async (req, res) => {
  const {
    productId,
    bookingDate,
    name,
    startTime,
    endTime,
    totalGuest,
    message,
    contactNumber,
    type,
    paymentStatus,
    advancePaid,
    totalPrice,
    specialRequest,
    farmHouseDetails,
    banquetDetails,
    villasDetails,
  } = req.body;
  if (
    !productId ||
    !bookingDate ||
    !name ||
    !startTime ||
    !endTime ||
    !totalGuest ||
    !message ||
    !contactNumber ||
    !type ||
    !paymentStatus
  ) {
    throw new ApiError(401, "Please fill all the fields");
  }
  if (type === "farm house" && !farmHouseDetails) {
    throw new ApiError(401, "Farmhouse details required for this booking type");
  }
  if (type === "banquet" && !banquetDetails) {
    throw new ApiError(401, "Banquet Details required for this booking type");
  }
  if (type === "villas" && !villasDetails) {
    throw new ApiError(401, "Villas Details required for this booking type");
  }
  const userId = req.user._id;
  const existingBooking = await Booking.findOne({
    userId,
    bookingDate: { $gte: new Date() },
    productId,
  });
  console.log(userId, "User Id");

  const product = await Product.findById(productId).populate("vendorId");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.vendorId) {
    throw new ApiError(400, "Product does not have a vendor assigned");
  }

  const newBooking = await Booking.create({
    userId,
    productId,
    bookingDate,
    name,
    startTime,
    endTime,
    totalGuest,
    message,
    contactNumber,
    type,
    paymentStatus,
    advancePaid: advancePaid || 0,
    totalPrice: totalPrice || 0,
    specialRequest,
    status: "pending",
    farmHouseDetails,
    banquetDetails,
    villasDetails,
    vendorId: product.vendorId,
    status: "pending",
  });
  const vendor = await User.findById(product.vendorId);
  console.log("Vendor", vendor);

  if (!vendor) {
    throw new ApiError(400, "Vendor not found");
  }

  await vendor.updateOne({ $push: { bookings: newBooking._id } });

  res.status(200).json(new ApiResponse(200, "Booking Created", newBooking));
});

const getUserBooking = asyncHandler(async (req, res) => {
  // const userId = req.user._id;
  const bookings = await Booking.find();

  res.status(200).json(new ApiResponse(200, "Success", bookings));
});

const getspecificBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);

  res.status(200).json(new ApiResponse(200, "Success", booking));
});
const updateBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (!status) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(400, "Booking not found");
  }
  // booking.bookingDate = bookingDate;
  booking.status = status;
  await booking.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Booking Updated Successfully", booking));
});

const deleteBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(400, "Booking not found");
  }
  await Booking.findByIdAndDelete(id);

  res
    .status(200)
    .json(new ApiResponse(200, "Booking Deleted Successfully", booking));
});
export {
  createBooking,
  getUserBooking,
  updateBooking,
  deleteBooking,
  getspecificBooking,
};
