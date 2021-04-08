const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(console.log("CONNECTED"))
    .catch((error) => console.log(error))
