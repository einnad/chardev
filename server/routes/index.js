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

// NEED LOGOUT TO CHANGE USER INFO
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/table", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("table");
  } else {
    res.redirect("/");
  }
});

router.get("/overview", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const data = await charModel.find({ creator: req.user["_id"] });
      // if not render overview form
      if (data.length <= 0) {
        res.render("overview");
      } else {
        // if data, render list of chars with links to table
        res.render("overview", { data: data });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/");
  }
});

router.post("/delete", async (req, res) => {
  const _id = req.body;
  try {
    await charModel.deleteOne({ _id: _id });
    res.redirect("/overview");
  } catch (error) {
    console.log(error);
  }
});

router.post("/save", async (req, res) => {
  try {
    const updates = req.body;
    await charModel
      .updateOne({ _id: updates._id }, { $set: updates })
      .then(() => {
        res.redirect("/overview");
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/table", async (req, res) => {
  const character = req.body.character;
  try {
    const char = await charModel.find({
      name: character,
      creator: req.user._id,
    });
    res.render("table", { char: char[0] });
  } catch (error) {
    console.log(error);
  }
});

// adjust sort for all future options // create form with group, name etc
router.post("/sort", async (req, res) => {
  const option = req.body.options;
  switch (option) {
    case "group":
      try {
        const data = await charModel
          .find({ creator: req.user._id })
          .sort({ group: 1 });
        res.render("overview", { data: data });
      } catch (error) {
        console.log(error);
      }
      break;
    case "name":
      try {
        const data = await charModel
          .find({ creator: req.user._id })
          .sort({ name: 1 });
        res.render("overview", { data: data });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.redirect("/overview");
  }
});

router.post("/init", async (req, res) => {
  try {
    if (req.user) {
      const {
        group,
        name,
        age,
        personality,
        appearance,
        relationships,
        notes,
      } = req.body;

      const char = new charModel({
        group,
        name,
        age,
        personality,
        appearance,
        relationships,
        notes,
        creator: req.user["_id"],
      });
      char.save();
      res.render("table", { char: char });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
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
    user.save();
    res.redirect("/");
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
