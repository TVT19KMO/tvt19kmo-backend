const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { cleanup } = require("./utils");

const parentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
      cast: false,
    },

    username: {
      type: String,
      required: true,
      unique: [true, "User with that username aready exists!"],
      cast: false,
    },

    passwordHash: {
      type: String,
      required: true,
      cast: false,
    },
  },
  {
    strict: "throw",

    toObject: {
      transform: (_, ret) => {
        cleanup(ret);
      },
    },

    toJSON: {
      transform: (_, ret) => {
        cleanup(ret);
        delete ret.passwordHash;
      },
    },
  }
);

parentSchema.virtual("token").get(() => {
  const userForToken = {
    username: this.username,
    id: this._id,
  };

  return jwt.sign(userForToken, "secretkey", { expiresIn: "1800s" });
});

module.exports = mongoose.model("Parent", parentSchema);
