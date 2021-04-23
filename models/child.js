const mongoose = require("mongoose");
const { cleanup } = require("./utils");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const childSchema = mongoose.Schema(
  {
    // Name of the child.
    name: {
      type: String,
      required: true,
      cast: false,
    },

    // The amount of coins child has.
    balance: {
      type: Number,
      required: true,
      cast: false,
      default: 0,
    },

    // The parent child is linked to.
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      cast: true,
    },

    // Unique linking code of the child.
    code: {
      type: Number,
      unique: true,
      required: true,
      cast: false,
      default: Math.floor(10000000 + Math.random() * 90000000),
    },

    // The device child is linked with.
    device: {
      type: String,
      cast: true,
      default: null,
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
        delete ret.parent;
      },
    },
  }
);

childSchema.virtual("token").get(function () {
  const userForToken = {
    code: this.code,
    id: this._id,
  };

  return jwt.sign(userForToken, "secretkey");
});

childSchema.plugin(mongooseUniqueValidator);

childSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Child", childSchema);
