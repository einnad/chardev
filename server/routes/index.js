import express from "express";

export const router = express.Router();

router.get("", (req, res) => {
  res.render("index");
});

router.get("/account", (req, res) => {
  res.render("signup");
});
