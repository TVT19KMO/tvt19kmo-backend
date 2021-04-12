const shoe = require("../models/shoe");

const data = [
    
    {
        name: "Classic shoe",
        color: "Blue",
        price: 100
    },
    {
        name: "Classic shoe",
        color: "Red",
        price: 100
    },
    {
        name: "Classic shoe",
        color: "Yellow",
        price: 100
    },
    {
        name: "Classic shoe",
        color: "Black",
        price: 100
    },
    {
        name: "Sneakers",
        color: "Blue",
        price: 300
    },
    {
        name: "Sneakers",
        color: "Red",
        price: 300
    },
    {
        name: "Sneakers",
        color: "Yellow",
        price: 300
    },
    {
        name: "Sneakers",
        color: "Black",
        price: 300
    },
    {
        name: "Cowboy boots",
        color: "Brown",
        price: 600
    }
];

const seeder = async () => {
    await shoe.deleteMany({});
    await shoe.insertMany(data);
};

module.exports = {
    data,
    seeder
};