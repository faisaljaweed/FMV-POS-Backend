import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/database.js";

dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log(`Mongodb Connection failed ${err}`);
  });
