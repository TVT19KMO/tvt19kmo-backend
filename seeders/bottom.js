const bottom = require("../models/bottom");

const data = [    
    {
        name: "Trousers",
        color: "Blue",
        price: 100
    },
    {
        name: "Trousers",
        color: "Red",
        price: 100
    },
    {
        name: "Trousers",
        color: "Yellow",
        price: 100
    },
    {
        name: "Trousers",
        color: "Black",
        price: 100
    },
    {
        name: "Shorts",
        color: "Blue",
        price: 100
    },
    {
        name: "Shorts",
        color: "Red",
        price: 100
    },
    {
        name: "Shorts",
        color: "Yellow",
        price: 100
    },
    {
        name: "Shorts",
        color: "Black",
        price: 100
    },
    {
        name: "Joggers",
        color: "Blue",
        price: 300
    },
    {
        name: "Joggers",
        color: "Red",
        price: 300
    },
    {
        name: "Joggers",
        color: "Yellow",
        price: 300
    },
    {
        name: "Joggers",
        color: "Black",
        price: 300
    }
];

const seeder = async () => {
    await bottom.deleteMany({});
    await bottom.insertMany(data);
};

module.exports = {
    data,
    seeder
};