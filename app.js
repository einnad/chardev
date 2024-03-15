import express from "express";
import env from "dotenv";
import session from "express-session";
import expressLayout from "express-ejs-layouts";
import { router } from "./server/routes/index.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "layout.ejs");
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
