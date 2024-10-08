import { tutorials as _tutorials } from "../models";
const Tutorial = _tutorials;


export function create(req, res) {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ||  false
    });
    
    // Save Tutorial in the database
    tutorial
        .save()
        .then(data => {
            
            res.send(data);
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });

} 
export async  function findAll(req, res) {
    const { title } = req.query;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    try {
        const tutorials = await Tutorial.find(condition);
        res.status(200).send(tutorials);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    }
}

export function findOne(req, res) {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
}

export function update(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
}

const _delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};
export { _delete as delete };

export function deleteAll(req, res) {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
}

export function findAllPublished(req, res) {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

export function findByTitle(req, res) {
    const title = req.query.title;
    console.log("Received title:", title); // Debugging line

    if (!title) {
        console.log("Title is undefined or empty"); // Debugging line
        return res.status(400).send({ message: "Title query parameter is required." });
    }

    // Use a regex to perform a case-insensitive search
    Tutorial.find({ title: { $regex: title, $options: "i" } })
        .then(data => {
            console.log("Raw data from database: ", data); // Debugging line
            if (!data || data.length === 0) {
                return res.status(404).send({ message: "No tutorials found with the title " + title });
            }
            console.log("Filtered search results: ", data); // Debugging line
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

