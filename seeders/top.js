const top = require("../models/top");

const data = [
    {
        name: "T-shirt",
        color: "Blue",
        price: 100
    },
    {
        name: "T-shirt",
        color: "Red",
        price: 100
    },
    {
        name: "T-shirt",
        color: "Yellow",
        price: 100
    },
    {
        name: "T-shirt",
        color: "Black",
        price: 100
    },
    {
        name: "Hoodie",
        color: "Blue",
        price: 100
    },
    {
        name: "Hoodie",
        color: "Red",
        price: 100
    },
    {
        name: "Hoodie",
        color: "Yellow",
        price: 100
    },
    {
        name: "Hoodie",
        color: "Black",
        price: 100
    },
    {
        name: "Jacket",
        color: "Blue",
        price: 300
    },
    {
        name: "Jacket",
        color: "Red",
        price: 300
    },
    {
        name: "Jacket",
        color: "Yellow",
        price: 300
    },
    {
        name: "Jacket",
        color: "Black",
        price: 300
    }       
];

const seeder = async () => {
    await top.deleteMany({});
    await top.insertMany(data);
};

module.exports = {
    data,
    seeder
};