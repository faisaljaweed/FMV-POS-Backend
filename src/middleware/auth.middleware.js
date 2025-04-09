import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../modal/user.modal.js";

export const VerifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "UNAUTHORAIZED");
    }
    const decode = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    const user = await User.findById(decode._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "InvalidToken");
  }
});
