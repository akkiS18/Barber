import express from "express";
import { create } from "express-handlebars";
import AuthRoutes from "./routes/auth.js";
import AdminRoutes from "./routes/queue.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash/lib/flash.js";
import session from "express-session";
import varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";
import userMiddleware from "./middleware/user.js";
import ifequal from "./utils/index.js";

dotenv.config();

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: ifequal,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "MykeyS18", resave: false, saveUninitialized: false })
);
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

//----MIDDLEWARE-----//
app.use(AuthRoutes);
app.use(AdminRoutes);

const startApp = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () =>
      console.log("Mongo DB connected")
    );

    const PORT = process.env.PORT || 4100;
    app.listen(4100, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
