import React, { useState } from "react";
import tutorialDataService from "../services/tutorial.service";

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
            published: published
        };

        console.log("submitting data: ", data);

        tutorialDataService.create(data)
        

            .then((response) => {


                setTitle(response.data.title);
                setDescription(response.data.description);
                setPublished(response.data.published);
                setSubmitted(true);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
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
                        Add
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

                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};


export default AddTutorial;
