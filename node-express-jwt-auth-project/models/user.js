const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "plz enter the email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "plz write the valid email"],
  },
  password: {
    type: String,
    required: [true, "plz enter the password"],
    minlength: [6, "Your password is too short(min 6)"],
  },
});

//mongoose hook this use after and beforse of any opration in db...
//after the user is craeted and save in db...
userSchema.post("save", function (doc, next) {
  console.log("user is created and save , ", doc);
  next();
});

//before the user is created and save in db...
//this hook help to hash the password before saveing in db...
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Password is Invaild");
  }
  throw Error("Incorrect email");
};

const user = mongoose.model("User", userSchema);
module.exports = user;
