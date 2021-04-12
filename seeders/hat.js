const hat = require("../models/hat");

const data = [
    
    {
        name: "Cap",
        color: "Blue",
        price: 100
    },
    {
        name: "Cap",
        color: "Red",
        price: 100
    },
    {
        name: "Cap",
        color: "Yellow",
        price: 100
    },
    {
        name: "Cap",
        color: "Black",
        price: 100
    },
    {
        name: "Beanie",
        color: "Blue",
        price: 100
    },
    {
        name: "Beanie",
        color: "Red",
        price: 100
    },
    {
        name: "Beanie",
        color: "Yellow",
        price: 100
    },
    {
        name: "Beanie",
        color: "Black",
        price: 100
    },
    {
        name: "Bandana",
        color: "Blue",
        price: 300
    },
    {
        name: "Bandana",
        color: "Red",
        price: 300
    },
    {
        name: "Bandana",
        color: "Yellow",
        price: 300
    },
    {
        name: "Bandana",
        color: "Black",
        price: 300
    },
    {
        name: "Crown",
        color: "Yellow",
        price: 600
    },
    {
        name: "Helmet",
        color: "Brown",
        price: 600
    },
    {
        name: "Cowboy hat",
        color: "Brown",
        price: 600
    }
];

const seeder = async () => {
    await hat.deleteMany({});
    await hat.insertMany(data);
};

module.exports = {
    data,
    seeder
};