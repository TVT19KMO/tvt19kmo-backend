const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const childSchema = mongoose.Schema(
  {
    // Name of the child.
    name: {
      type: String,
      required: true,
      unique: true,
      cast: false,
    },

    // The amount of coins child has.
    balance: {
      type: Number,
      required: true,
      default: 0,
      cast: false,
    },

    // The parent child is linked to.
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: false,
      cast: true,
    },

    // Unique linking code of the child.
    code: {
      type: Number,
      required: true,
      default: Math.floor(10000000 + Math.random() * 90000000),
      cast: false,
    },

    // The device child is linked with.
    device: {
      type: String,
      required: false,
      cast: true,
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

childSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Child", childSchema);
