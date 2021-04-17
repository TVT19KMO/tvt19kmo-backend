const mongoose = require("mongoose");
//const dotenv = require('dotenv')

//dotenv.config()

const dbConnection =
  //"mongodb+srv://project_admin:admin1234@project.4eapx.mongodb.net/project?retryWrites=true&w=majority";
  "mongodb+srv://test-user:admin1234@testi.vsxyw.mongodb.net/testi?retryWrites=true&w=majority"   //    TESTAUSTA VARTEN
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log("CONNECTED"))
  .catch((error) => console.log(error));
