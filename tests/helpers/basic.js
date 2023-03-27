const { cwd } = require("node:process");
//TODO: crear una funcion que busque el archivo index.js, con cwd() o en src y en dis, si lo encuentra en dist, entonces usara este. NOTA: se puede usar fs-extra
//TODO: tambien se me ocurre que este modulo puede tener un archivo de configuracion, tanto puede ser un archivo, como incluirse dentro del paqueete.json, que contenga una propiedad, que tenga la ubicacion del index.js.
const index = `${cwd()}/index.js`;
const { app, server } = require(index);
const request = require("supertest");
const api = request(app);

const statusCodes = [200, 201, 204, 304, 400, 401, 403, 404, 500];

/**
 * Te permite mandar una peticion get a la API
 * @param {*} path La ruta para la peticion
 */
const getApi = async (path) => {
  return await api.get(path);
};

/**
 * Te permite mandar un peticion delete a la API
 * @param {*} path LA ruta a la peticion
 * @param {*} element El elemento que quieres eliminar. Por lo general se manda un id.
 */
const deleteApi = async (path, element) => {
  return await api.delete(`${path}/${element}`);
};

/**
 * Te permite mandar una peticion put a la API
 * @param {*} path
 * @returns
 */
const putApi = async (path,content) => {
  return await api.put(path).send(content);
};

/**
 * Te permite mandar peticiones post a la api
 * @param {string} path La ruta de la peticion
 * @param {*} content El contenido de la peticion.
 */
const postApi = async (path, content) => {
  return await api.post(path).send(content);
};

/**
 * Verfica el status code de la respuesta sea apropiado, tambien puede verificar que el status code no sea otro.
 * @param resStatus La propiedad status devuelta por la respuesta. `res.status`
 * @param statusCode El status code que esperas recibir.
 */
const checkStatusCode = (resStatus, statusCode) => {
  for (const prop in statusCodes) {
    const value = statusCodes[prop];
    if (value !== statusCode) {
      expect(resStatus).not.toBe(value);
    }
    expect(resStatus).toBe(statusCode);
  }
};

//TODO: crear funciones para testiar el mismo tipo de endpoint, ejemplo: get, getOne, post, edit, delete, query.

/**
 * Verifica el formato de la respuesta, si es JSON o HTML.
 * @param header El header de la respuesta `res.header`
 * @param format El formato esperado de la respuesta, posibles valores `json|html`
 */
const checkFormatRes = (header, format) => {
  //TODO: verificar si format es json o html, en caso de que no tirar un error.
  if (format === "json") {
    expect(header["content-type"]).toMatch(/application\/json/);
    return;
  }
  expect(header["content-type"]).toMatch(/text\/html/);
};

/**
 * Verifica si un valor espesifico se encuentra en un grupo de valores. Usa `expect(values).toContain(value)`
 * @param {*} values Los valores que quieres comprobar
 * @param {*} value El valor espesifico que quieres verificar
 */
const checkValuesToContain = (values,value) => {
  expect(values).toContain(value);
};

/**
 * Verifica si un valor espesifico no se encuentra en un grupo de valores. Usa `expect(values).not.toContain(value)`
 * @param {*} values Los valores que quieres comprobar
 * @param {*} value El valor espesifico que quieres verificar
 */
const checkValuesNotToContain = (values,value) => {
  expect(values).not.toContain(value);
};

/**
 * Te permite comparar dos valores, usa `expect(prop1).toBe(prop2);`
 * @param {*} firstProp El primer valor a comparar
 * @param {*} secondProp El segundo valor a comparar
 */
const compareValues = (firstValue, secondValue) => {
  expect(firstValue).toBe(secondValue);
};

/**
 * Verifica la longitud de un objeto. usa `expect(object).toHaveLength(length);`
 * @param {*} object El objeto que quieres comparar su length, por lo general se usa `res.body`.
 * @param {*} length La length que deceas comprar. Por lo general se usa la longitud de la base de datos.
 */
const checkLength = (object, length) => {
  expect(object).toHaveLength(length);
};

/**
 * Verifica la longitud de un objeto mas uno. Se usa para verificar si un nuevo elemento fue anadido. Usa `expect(object).toHaveLength(length + 1)`
 * @param {*} object El objeto que quieres comparar su length, por lo general se usa `res.body`.
 * @param {*} length La length que deceas comprar. Por lo general se usa la longitud de la base de datos.
 */
const checkLengthPlus = (object, length) => {
  expect(object).toHaveLength(length + 1);
};

/**
 * Verifica la longitud de un objeto menos uno. Se usa para verificar si un nuevo elemento fue eliminado. Usa `expect(object).toHaveLength(length - 1)`
 * @param {*} object El objeto que quieres comparar su length, por lo general se usa `res.body`.
 * @param {*} length La length que deceas comprar. Por lo general se usa la longitud de la base de datos.
 */
const checkLengthMinus = (object, length) => {
  expect(object).toHaveLength(length - 1);
};



module.exports = {
  api,
  server,
  getApi,
  postApi,
  putApi,
  deleteApi,
  checkStatusCode,
  compareValues,
  checkFormatRes,
  checkLength,
  checkValuesToContain,
  checkValuesNotToContain,
  checkLengthPlus,
  checkLengthMinus
};
