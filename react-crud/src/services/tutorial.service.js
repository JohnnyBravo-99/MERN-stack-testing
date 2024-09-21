import http from "../http-common";

const getAll = async () => {
    try {
        const response = await http.get(`/api/tutorials`);
        console.log("getAll: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting all tutorials: ", error);
        throw error;
    }
};

const get = async (id) => {
    try {
        const response = await http.get(`/tutorials/${id}`);
        console.log("get: ", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error getting tutorial with id ${id}: `, error);
        throw error;
    }
};

const create = async (data) => {
    try {
        const response = await http.post(`/tutorials`, data);
        console.log("create: ", response.data);
        return response.data;
    } catch (error) {
        console.error("There was an issue creating the tutorial: ", error);
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const response = await http.put(`/tutorials/${id}`, data);
        console.log("update: ", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating tutorial with id ${id}: `, error);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const response = await http.delete(`/tutorials/${id}`);
        console.log("remove: ", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error removing tutorial with id ${id}: `, error);
        throw error;
    }
};

const removeAll = async () => {
    try {
        const response = await http.delete(`/tutorials`);
        console.log("removeAll: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error removing all tutorials: ", error);
        throw error;
    }
};

const findByTitle = async (title) => {
    try {
        const response = await http.get(`/tutorials?title=${title}`);
        console.log("findByTitle: ", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error finding tutorials by title ${title}: `, error);
        throw error;
    }
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