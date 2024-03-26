import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bodyParser from "body-parser";
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
  res.render("overview");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    // check user exists // error handle
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    // verify password // reject
    const passcode = await bcrypt.compare(password, user.password); // issue here, invalid password
    if (!passcode)
      return res.status(400).json({ message: "Invalid credentials." });

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });

    // get objectid to place into characters?
    // user.objectID

    // select all characters as data to send
    const data = await charModel.find();
    console.log(data);
    if (data.length === 0) {
      console.log("LOGIN OK, NEW");
      return res.redirect("/overview");
    } else {
      console.log("LOGIN OK");
      return res.redirect("overview", { data });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/init", checkToken, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);
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

// to access characters table route
function checkToken(req, res, next) {
  let token = req.header("Authorisation");
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  token = token.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    // add to curr user
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

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
