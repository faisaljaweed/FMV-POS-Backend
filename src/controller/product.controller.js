import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../modal/product.modal.js";
const addProduct = asyncHandler(async (req, res) => {
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
  console.log(req.body);

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

  const property = await Product.create({
    name,
    vendorId: req.user._id,
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
