import express from "express";
import bcrypt from "bcrypt";
import { JsonWebTokenError, Jwt } from "jsonwebtoken";
import { User } from "../models/User";
import env from "dotenv";

env.config();

export const router = express.Router();
const salts = process.env.SALT;

router.get("", (req, res) => {
  res.render("index");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = bcrypt.hash(password, salts);
    const user = new User({
      username,
      password: hashPassword,
    });

    await user.save().then((user) => {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token, user });
    });
  } catch {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // check user exists // error handle
    if (!user) return res.status(400).json({ message: "Invalid username." });

    // verify password // reject
    const passcode = await bcrypt.compare(password, user.password);
    if (!passcode)
      return res.status(400).json({ message: "Invalid password." });

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch {
    console.log(error);
  }
});

// to access characters table route
function checkUser(req, res, next) {
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
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
}
