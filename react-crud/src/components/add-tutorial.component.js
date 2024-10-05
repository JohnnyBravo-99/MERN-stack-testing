import React, { useState } from "react";
import TutorialDataService from "../services/tutorial.service";

const AddTutorial = () => {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [published, setPublished] = useState(false);
const [submitted, setSubmitted] = useState(false);

const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
};

const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
};

const saveTutorial = () => {
    
    const data = {
        title: title,
        description: description,
        published: published,
        
    };

    TutorialDataService.create(data)
    
        .then((tutorial) => {
            console.log("Response data is: ", tutorial);
            
            if (tutorial) {

                setTitle(tutorial.title); // Clear title
                setDescription(tutorial.description); // Clear description
                setPublished(tutorial.published); // Reset published status
                setSubmitted(true); // Set submitted to true
            }
        })
        .catch((error) => {
            console.log("There was an issue adding the tutorial", error);
            // Optionally, handle error state here
        });

  
};


const newTutorial = () => {
    setTitle("");
    setDescription("");
    setPublished(false);
    setSubmitted(false);
};


return (

    <div className="submit-form">
        {submitted ? (
            <div>
                <h4>Success!</h4>
                <button className="btn btn-success" onClick={newTutorial}>
                    Add/New Tutorial Submit
                </button>
            </div>

        ) : (
            <div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={title}
                        onChange={onChangeTitle}
                        name="title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={description}
                        onChange={onChangeDescription}
                        name="description"
                    />
                </div>

                <button onClick={saveTutorial} onTouchStart={saveTutorial} className="btn btn-success">
                    Submit
                </button>
            </div>
        )}
    </div>
)};
;

export default AddTutorial;
