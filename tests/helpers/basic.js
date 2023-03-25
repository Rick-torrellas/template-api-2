const {app,server} = require('./../../index.js');
const request = require('supertest');
const api = request(app);

const getApi = async (path) => {
    return await api.get(path);
}

const deleteApi = async (path,element) => {
    return await api.delete(`${path}/${element}`);
}

const putApi = async (path) => {
    return await api.put(path)
}
const postApi = async (path,content) => {
    return await api.post(path).send(content);
}
/**
 * Verfica el status code de la respuesta sea apropiado, tambien puede verificar que el status code no sea otro.
 * @param noCode Es un array con los status code que no quieres recibir.
 * @param positiveCode Es el status code que quieres comprobar
 */
const checkStatusCode = ({res,positiveCode,noCode}) => {
    expect(res.status).toBe(positiveCode);
    if (noCode) {
       checkNoStatusCode({res,noCode});
    }
}
/**
 * Verifica los status code que no se espera recibir.
 */
const checkNoStatusCode = ({res,noCode}) => {
    for ( const prop in noCode) {
        const value = noCode[prop];
        expect(res.status).not.toBe(value);
    }
}
// Cuando esperas recibir el status 200.
const status200 = {
    positiveCode: 200,
    noCode: [201,204,304,400,401,403,404,500]
}
module.exports = {
    api,
    server,
    getApi,
    postApi,
    putApi,
    deleteApi,
    checkStatusCode,
    status200
}