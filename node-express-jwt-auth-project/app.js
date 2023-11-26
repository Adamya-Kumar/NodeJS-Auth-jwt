require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouters = require("./router/authRouters");
const cookieParser = require("cookie-parser");
const { requiredAuth, checkUser } = require("./middleware/authmiddleware");
const app = express();
const port= process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =process.env.MONGO_URL;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(port)
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requiredAuth, (req, res) => res.render("smoothies"));

app.use(authRouters);
