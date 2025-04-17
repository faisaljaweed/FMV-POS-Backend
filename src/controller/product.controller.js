import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../modal/product.modal.js";
import fs from "fs";
import { uploadCloudinary } from "../utils/cloudinary.js";
const addProduct = asyncHandler(async (req, res) => {
  const {
    VenuName,
    description,
    location,
    price,
    type,
    standingCapacity,
    seatedCapacity,
    size,
    features,
  } = req.body;
  console.log(req.body);

  if (
    !VenuName ||
    !description ||
    !location ||
    !price ||
    !type ||
    !standingCapacity ||
    !seatedCapacity ||
    !size ||
    !features
  ) {
    throw new ApiError(401, "All Fields are required");
  }

  if (!req.files || !req.files.pics || !req.files.pics.length === 0) {
    throw new ApiError(400, "At least one image file is required");
  }
  const uploadedPics = await Promise.all(
    req.files.pics.map(async (file) => {
      const result = await uploadCloudinary(file.path);
      // fs.unlinkSync(file.path, (err) => {
      //   if (err) {
      //     console.error("File Deletion Error:", err);
      //   } else {
      //     console.log("File deleted successfully");
      //   }
      // });
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (deleteErr) {
        console.error("File delete karte waqt error:", deleteErr);
      }
      if (!result || !result.url) {
        throw new ApiError(500, "Failed to upload image to Cloudinary");
      }
      return result.url;
    })
  );
  const property = await Product.create({
    VenuName,
    vendorId: req.user._id,
    pics: uploadedPics,
    description,
    location,
    price,
    type,
    standingCapacity,
    seatedCapacity,
    size,
    features,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Product Added Successfully", property));
});

const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  res.status(200).json(new ApiResponse(200, "Success", product));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(new ApiResponse(200, "Success", product));
});

const EditProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    location,
    price,
    type,
    standingCapacity,
    seatedCapacity,
    size,
    features,
  } = req.body;
  if (
    !name ||
    !description ||
    !location ||
    !price ||
    !type ||
    !standingCapacity ||
    !seatedCapacity ||
    !size ||
    !features
  ) {
    throw new ApiError(401, "All Fields are required");
  }
  const product = await Product.findByIdAndUpdate(id);
  if (!product) {
    throw new ApiError(401, "Product not found");
  }
  product.name = name;
  product.description = description;
  product.location = location;
  product.price = price;
  product.type = type;
  product.standingCapacity = standingCapacity;
  product.seatedCapacity = seatedCapacity;
  product.size = size;
  product.features = features;
  await product.save();

  res.status(200).json(new ApiResponse(200, "Success", product));
});

const DeleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, "Product Deleted Successfully", product));
});

export {
  addProduct,
  getAllProduct,
  getProductById,
  EditProduct,
  DeleteProduct,
};
