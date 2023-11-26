const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleError = (err) => {
  //handle error
  console.log(err.message, err.code);
  let error = { email: "", password: "" };

  //log for email
  if (err.message === "Incorrect email") {
    error.email = "email is invalid";
  }
  if (err.message === "Password is Invaild") {
    error.password = "password is invalid";
  }

  //dulpicate user error
  if (err.code === 11000) {
    error.email = "this email is already registered";
    return error;
  }

  //validation error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const createToken = (id) => {
  return jwt.sign({ id }, "test1234", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

function signup_get(req, res) {
  return res.render("signup");
}
function login_get(req, res) {
  return res.render("login");
}
async function signup_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const Error = handleError(error);
    res.status(400).json({ Error });
  }
}
async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = handleError(err);
    res.status(400).json({ error });
  }
}

function logout_get(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
};
