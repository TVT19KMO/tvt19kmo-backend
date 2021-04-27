const mongoose = require("mongoose");
const { cleanup } = require("./utils");

const purchasesSchema = new mongoose.Schema(
  {
    // The child who owns the purchases.
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
      cast: true,
    },

    // TODO: Refactor different item types (hats, shoes etc.) to have a single schema and add a field for the type of the item!
    // The items child has purchased.
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        cast: true,
        ref: "Item",
      },
    ],
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
      },
    },
  }
);

purchasesSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Purchases", purchasesSchema);
