import cloudinary from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    try {
      if (fs.existsSync(localfilePath)) {
        fs.unlinkSync(localfilePath);
      }
    } catch (deleteErr) {
      console.error("File delete karte waqt error:", deleteErr);
    }

    return uploadResult;
  } catch (error) {
    if (fs.existsSync(localfilePath)) {
      fs.unlinkSync(localfilePath);
    }
    console.log("Error uploading to cloudinary ", error);
    return null;
  }
};

export { uploadCloudinary };
