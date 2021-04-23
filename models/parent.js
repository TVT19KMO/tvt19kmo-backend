const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { cleanup } = require("./utils");

const parentSchema = mongoose.Schema(
  {
    // Email of the parent.
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
      cast: false,
    },

    // Username of the parent.
    username: {
      type: String,
      required: true,
      unique: true,
      cast: false,
    },

    // Password hash of the parent.
    passwordHash: {
      type: String,
      required: true,
      cast: false,
    },

    // Balance of the parent's account.
    balance: {
      type: Number,
      required: true,
      default: 5000,
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
