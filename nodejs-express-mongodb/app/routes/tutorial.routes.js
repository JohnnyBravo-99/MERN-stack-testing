module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    let router = require("express").Router();



    // Create a new Tutorial
    router.post("/", (req, res, next) => {
        console.log("Incoming request:", req.body); // Log the incoming request
        next(); // Call the next middleware
    }, tutorials.create);

    // Retrieve all Tutorials

    router.get("/", tutorials.findAll)
    

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};