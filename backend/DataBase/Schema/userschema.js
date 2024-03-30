// Given simple user schema

const mongoose = require("mongoose");
const salt = require("./salt");
const bs = require("bcryptjs")

const User_schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});


async function generateHash(pass) {
  const salt_ = await salt;
  const password = await bs.hash(pass, salt_);
  return password;
}

const hashpassword = async function(next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  const hashed_password = await generateHash(user.password);
  user.password = hashed_password;
};

const checkPass = async function(password){
  const bool = await bs.compare(password,this.password);
  return bool;
}

User_schema.pre("save", hashpassword);

User_schema.methods.checkpassword = checkPass;

const User = new mongoose.model("User", User_schema);
module.exports = { User, User_schema };
