const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const mongooseUniqueValidator = require("mongoose-unique-validator");
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
      unique: true,
      cast: false,
    },

    passwordHash: {
      type: String,
      required: true,
      cast: false,
    },

    balance: {
      type: Number,
      required: true,
      default: 5000,
      cast: false,
    },

    link: {
      type: Number,
      required: true,
      default: Math.floor(10000000 + Math.random() * 90000000),
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

parentSchema.virtual("token").get(function () {
  const userForToken = {
    username: this.username,
    id: this._id,
  };

  return jwt.sign(userForToken, "secretkey");
});

parentSchema.plugin(mongooseUniqueValidator);

parentSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Parent", parentSchema);
