const Item = require("../models/item");

const HAT_TYPE = "hat";

const data = [
  // HATS =======================
  {
    type: HAT_TYPE,
    name: "Cap",
    color: "Blue",
    price: 100,
  },
  {
    type: "hat",
    name: "Cap",
    color: "Red",
    price: 100,
  },
  {
    type: "hat",
    name: "Cap",
    color: "Yellow",
    price: 100,
  },
  {
    type: "hat",
    name: "Cap",
    color: "Black",
    price: 100,
  },
  {
    type: "hat",
    name: "Beanie",
    color: "Blue",
    price: 100,
  },
  {
    type: "hat",
    name: "Beanie",
    color: "Red",
    price: 100,
  },
  {
    type: "hat",
    name: "Beanie",
    color: "Yellow",
    price: 100,
  },
  {
    type: "hat",
    name: "Beanie",
    color: "Black",
    price: 100,
  },
  {
    type: "hat",
    name: "Bandana",
    color: "Blue",
    price: 300,
  },
  {
    type: "hat",
    name: "Bandana",
    color: "Red",
    price: 300,
  },
  {
    type: "hat",
    name: "Bandana",
    color: "Yellow",
    price: 300,
  },
  {
    type: "hat",
    name: "Bandana",
    color: "Black",
    price: 300,
  },
  // SHOES ==============================
  {
    type: "shoe",
    name: "Sneakers",
    color: "Blue",
    price: 300,
  },
  {
    type: "shoe",
    name: "Sneakers",
    color: "Red",
    price: 300,
  },
  {
    type: "shoe",
    name: "Sneakers",
    color: "Yellow",
    price: 300,
  },
  {
    type: "shoe",
    name: "Sneakers",
    color: "Black",
    price: 300,
  },
  {
    type: "bottom",
    name: "Trousers",
    color: "Blue",
    price: 100,
  },
  {
    type: "bottom",
    name: "Trousers",
    color: "Red",
    price: 100,
  },
  {
    type: "bottom",
    name: "Trousers",
    color: "Yellow",
    price: 100,
  },
  {
    type: "bottom",
    name: "Trousers",
    color: "Black",
    price: 100,
  },
  {
    type: "bottom",
    name: "Jeans",
    color: "Blue",
    price: 100,
  },
  {
    type: "bottom",
    name: "Jeans",
    color: "Red",
    price: 100,
  },
  {
    type: "bottom",
    name: "Jeans",
    color: "Yellow",
    price: 100,
  },
  {
    type: "bottom",
    name: "Jeans",
    color: "Black",
    price: 100,
  },
  // TOPS ======================
  {
    type: "top",
    name: "Hoodie",
    color: "Blue",
    price: 100,
  },
  {
    type: "top",
    name: "Hoodie",
    color: "Red",
    price: 100,
  },
  {
    type: "top",
    name: "Hoodie",
    color: "Yellow",
    price: 100,
  },
  {
    type: "top",
    name: "Hoodie",
    color: "Black",
    price: 100,
  },
  {
    type: "top",
    name: "Jacket",
    color: "Blue",
    price: 300,
  },
  {
    type: "top",
    name: "Jacket",
    color: "Red",
    price: 300,
  },
  {
    type: "top",
    name: "Jacket",
    color: "Yellow",
    price: 300,
  },
  {
    type: "top",
    name: "Jacket",
    color: "Black",
    price: 300,
  },
];

const seeder = async () => {
  await Item.collection.drop();
  await Item.insertMany(data);
};

module.exports = {
  data,
  seeder,
};
