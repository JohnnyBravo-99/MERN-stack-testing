const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();



const db = require("./app/models");
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("connected the the database!");
    })
    .catch(err => {
        console.error("Cannot connect to the databse!", err);
        process.exit();
    });

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());



//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
     // Adjust the path as necessary
    
})

require("./app/routes/tutorial.routes.js")(app);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });




