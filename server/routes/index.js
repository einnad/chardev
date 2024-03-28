import express from "express";
import bcrypt from "bcrypt";
import env from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import userModel from "../models/User.js";
import charModel from "../models/Char.js";

export const router = express.Router();
env.config();
const salts = +process.env.SALT;
router.use(bodyParser.urlencoded({ extended: true }));

router.get("", (req, res) => {
  res.render("index");
});

router.get("/overview", (req, res) => {
  console.log(req.user);
  res.render("overview");
});

router.post("/signup", async (req, res) => {
  try {
    if (req.body["username"].length < 4) {
      return res.status(400).json({
        message:
          "Username not found. Enter a valid username more than 3 characters",
      });
    }
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, salts);
    const user = new userModel({
      username,
      password: hashPassword,
    });
    console.log("SIGNUP OK");
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/overview",
    failureRedirect: "/",
  })
);

router.post("/init", async (req, res) => {
  console.log(req.user);
  try {
    const { name, age, personality, appearance, relationships, notes } =
      req.body;

    const char = new charModel({
      name,
      age,
      personality,
      appearance,
      relationships,
      notes,
      creator: req.user["_id"],
    });

    res.render("table", { char });
  } catch (error) {
    console.log(error);
  }
});

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const user = await userModel.findOne({ username }); // find user
      if (!user) return cb("Invalid credentials");

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return cb(err);
        } else {
          if (result) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
