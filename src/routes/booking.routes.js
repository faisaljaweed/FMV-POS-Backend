import express from "express";
import {
  createBooking,
  deleteBooking,
  getUserBooking,
  updateBooking,
  getspecificBooking,
} from "../controller/booking.controller.js";

import { VerifyJWT } from "../middleware/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.route("/get-user-bookings").get(getUserBooking);
bookingRouter.route("/add-booking").post(VerifyJWT, createBooking);
bookingRouter.route("/get-specific-booking/:id").get(getspecificBooking);
bookingRouter.route("/update-booking/:id").put(updateBooking);
bookingRouter.route("/delete-booking/:id").delete(deleteBooking);

export default bookingRouter;
