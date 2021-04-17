module.exports = {
  stripe: require("./stripe"),
  mw: {
    ...require("./mw"),
    ...require("./auth"),
  },
  errors: require("./errors"),
};
