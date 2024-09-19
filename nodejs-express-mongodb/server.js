const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("connected the the databse!");
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

    res.json({ message: "Welcome to my application!" });
});

require("./app/routes/tutorial.routes")(app);

    const PORT = process.env.PORT || 8082;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });




