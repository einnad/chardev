import express from "express";

export const router = express.Router();

router.get("", (req, res) => {
  res.render("index");
});

router.get("/account", async (req, res) => {
  // const data = await db.collection("chardev").find();
  // console.log(data);
  res.render("signup", data);
});
