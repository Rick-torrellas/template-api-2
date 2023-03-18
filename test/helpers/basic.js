const {app,server} = require('./../../index.js');
const request = require('supertest');
const api = request(app);

const getApi = async (path) => {
    return await api.get(path);
}

const deleteApi = async (path) => {
    return await api.delete(path);
}

const putApi = async (path) => {
    return await api.put(path)
}
const postApi = async (path,content) => {
    return await api.post(path).send(content);
}
module.exports = {
    api,
    server,
    getApi,
    postApi,
    putApi,
    deleteApi
}