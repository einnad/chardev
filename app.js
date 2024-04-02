import express from "express";
import env from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import expressLayout from "express-ejs-layouts";
import { router } from "./server/routes/index.js";
import { connectDB } from "./server/routes/config/db.js";
import passport from "passport";

env.config();
const app = express();
const port = process.env.PORT || 3000;

// db connection
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_STRING,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayout);
app.set("layout", "layout.ejs");
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
