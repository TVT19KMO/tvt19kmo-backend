const cleanup = (doc) => {
  doc.id = doc._id.toString();
  delete doc._id;
  delete doc.__v;
};

module.exports = { cleanup };
