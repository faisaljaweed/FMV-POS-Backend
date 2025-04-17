import express from "express";

const productRouter = express.Router();

import {
  addProduct,
  DeleteProduct,
  EditProduct,
  getAllProduct,
  getProductById,
} from "../controller/product.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
productRouter
  .route("/create-product")
  .post(VerifyJWT, upload.fields([{ name: "pics", maxCount: 8 }]), addProduct);
productRouter.route("/get-all-product").get(VerifyJWT, getAllProduct);
productRouter.route("/get-product/:id").get(VerifyJWT, getProductById);
productRouter.route("/update-product/:id").put(VerifyJWT, EditProduct);
productRouter.route("/delete-product/:id").delete(VerifyJWT, DeleteProduct);

export default productRouter;
