const mongoose = require('mongoose')
//const dotenv = require('dotenv')

//dotenv.config()

const dbConnection = 'mongodb+srv://project_admin:admin1234@project.4eapx.mongodb.net/project?retryWrites=true&w=majority'

mongoose.connect(dbConnection, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log("CONNECTED"))
    .catch((error) => console.log(error))
