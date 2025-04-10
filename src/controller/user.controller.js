import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../modal/user.modal.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "User not Found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      "SomeThing went wrog while generating access and refresh Token"
    );
  }
};

const Signup = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;
  console.log(req.body);
  if (!username || !email || !password || !confirmPassword || !role) {
    throw new ApiError(401, "All Fields are required ");
  }
  if (password !== confirmPassword) {
    throw new ApiError(401, "Passwords do not match");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(401, "User Already Exists");
  }
  const user = await User.create({ username, email, password, role });

  res.status(200).json(new ApiResponse(200, "User Created Successfully", user));
});
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    throw new ApiError(401, "All fields ar required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const isPassworCorrect = await user.comparePassword(password);
  if (!isPassworCorrect) {
    throw new ApiError(401, "Password is Incorrect");
  }
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );
  console.log("Access Token", accessToken, "Refresh Token", refreshToken);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpsOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Login Successfully", {
        loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});
const Logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});
const GetUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(new ApiResponse(200, "Success", user));
});
const DeleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "User Deleted Successfully", user));
});

export {
  generateAccessandRefreshToken,
  Signup,
  Login,
  Logout,
  GetUser,
  DeleteUser,
};
