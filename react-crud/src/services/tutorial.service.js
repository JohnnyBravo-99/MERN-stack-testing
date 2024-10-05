import http from "../http-common";

const getAll = () => {
    return http.get(`/tutorials`)
        .then(response => {
            console.log("getAll: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error("Error getting all tutorials: ", error);
            throw error; // Rethrow the error for handling in the calling function
        });
};

const get =  (id) => {  // Changed to async
    return  http.get(`/tutorials/${id}`)  // Added await
            
        .then(response => {
            console.log("get: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error(`Error getting tutorial with id ${id}: `, error);
            throw error; // Rethrow the error
        });
};

const create = async (data) => {
    return await http.post(`/tutorials`, data)
        .then(response => {
            console.log("create: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error("There was an issue creating the tutorial: ", error);
            throw error; // Rethrow the error
        });
};

const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data)
        .then(response => {
            console.log("update: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error(`Error updating tutorial with id ${id}: `, error);
            throw error; // Rethrow the error
        });
};

const remove = (id) => {
    return http.delete(`/tutorials/${id}`)
        .then(response => {
            console.log("remove: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error(`Error removing tutorial with id ${id}: `, error);
            throw error; // Rethrow the error
        });
};

const removeAll = () => {
    return http.delete(`/tutorials`)
        .then(response => {
            console.log("removeAll: ", response.data);
            return response.data; // Return the data
        })
        .catch(error => {
            console.error("Error removing all tutorials: ", error);
            throw error; // Rethrow the error
        });
};

const findByTitle = (title) => {
    console.log("Searching for title:", title); // Debugging line
    return http.get(`/tutorials?title=${title}`)
        .then(response => {
            console.log("findByTitle: ", response.data);
            return Array.isArray(response.data) ? response.data : [];
        })
        .catch(error => {
            console.error(`Error finding tutorials by title ${title}: `, error);
            throw error;
        });
};

const TutorialDataService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default TutorialDataService;