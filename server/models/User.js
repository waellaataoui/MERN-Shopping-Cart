const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email invalid");
      }
    }
  },
  password: {
    type: String
  },
  profileName: {
    type: String
  },
  thumbnail: {
    type: String
  },
  cart: {
    type: Object
  }
});
userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.password || !user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  next();
});
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
