const mongoose = require("mongoose");
const { describe } = require("node:test");
const Test = require("./../models/Test.js");
const {
  initialTest,
  getTitlefromTests,
  newTest,
  newTestEmpty,
} = require("./helpers/text.js");
const {
  server,
  deleteApi,
  checkStatusCode,
  getApi,
  postApi,
  compareProp,
  checkFormatRes,
  checkLength,
} = require("./helpers/basic.js");

beforeEach(async () => {
  await Test.deleteMany({});
  for (const test of initialTest) {
    const testObject = new Test(test);
    await testObject.save();
  }
});

describe("GET /test", () => {
  const path = '/test';
  describe("true", () => {
    test("GET /test - Verifica que la peticion se cumple correctamente", async () => {
      const {status,text,header} = await getApi(path);
      const statusCode = 200;
      const expectedContent = "test";
      const expectedFormat = "html";
      
      checkStatusCode(status, statusCode);
      compareProp(text,expectedContent);
      checkFormatRes(header,expectedFormat);
    });
  });
});

describe("GET /test/get", () => {
  const path = "/test/get";
  describe("true", () => {
    test("GET /test/get - Verifica que la peticion se ejecuta correctamente", async () => {
      const {status,body,header} = await getApi(path);
      const statusCode = 200;
      // Obtengo las propiedades titles de mis test.1
      const titles = body.map(test => test.title);
      const expectedLength = initialTest.length;
      const expectedProp = initialTest[0].title;
      const comparedProp = body[0].title;
      const expectedResFormat = "json";

      checkStatusCode(status, statusCode);
      // Que contenga la cantidad de propiedades
      checkLength(body,expectedLength);
      // Que la propiedad espesifica tenga el titulo
      compareProp(comparedProp,expectedProp);
      // Que devuelva un json
      checkFormatRes(header,expectedResFormat);
      // Que alguna de las propiedades tenga el titulo
      expect(titles).toContain(initialTest[1].title);
    });
  });
});

describe.skip("POST /test/post", () => {
  const path = "/test/post";
  const getTestPath = "/test/get";
  describe("true", () => {
    test("POST /test/post - Verifica el status code", async () => {
      const res = await postApi(path, newTest);
      const statusCode = 201;

      checkStatusCode({ res, statusCode });
    });
    test("POST /test/post - Verifica el si se creo el objeto", async () => {
      const firstRes = await postApi(path, newTest);
      const res = await getApi(getTestPath);
      const titles = await getTitlefromTests();

      expect(JSON.stringify(firstRes.header)).toMatch(/application\/json/);
      expect(res.body).toHaveLength(initialTest.length + 1);
      expect(titles).toContain(newTest.title);
    });
  });
  describe("false", () => {
    test("POST /test/post - Verifica que regrese el statuscode correcto", async () => {
      const create = await postApi(path, newTestEmpty);
      const statusCode = 400;

      checkStatusCode({ res: create, statusCode });
    });
    test("POST /test/post - Verifica que el objeto sin titulo no sea anadido", async () => {
      const getPath = "/test/get";
      await postApi(path, newTestEmpty);

      const res = await getApi(getPath);
      expect(res.body).toHaveLength(initialTest.length);
    });
  });
});

describe.skip("DELETE /test/delete/:id", () => {
  const path = "/test/delete";
  const getTestPath = "/test/get";
  describe("true", () => {
    test("DELETE /test/delete/:id - Verifica el status code", async () => {
      const { body: tests } = await getApi(getTestPath);
      const testToDelete = tests[0];
      const res = await deleteApi(path, testToDelete._id);
      const statusCode = 204;

      checkStatusCode({ res, statusCode });
    });
    test("DELETE /test/delete/:id - Verifica si un test puede eliminarse", async () => {
      // Crea una peticion para eliminar el test
      const { body: tests } = await getApi(getTestPath);
      const testToDelete = tests[0];
      await deleteApi(path, testToDelete._id);

      // Crea una peticion para verificar si se elimino
      const titles = await getTitlefromTests();
      const secondRes = await getApi(getTestPath);
      // Espera que el total de test sea menos uno, que es el test que se elimino.
      expect(secondRes.body).toHaveLength(initialTest.length - 1);
      // Se verifica si esta el titulo del test que se elimino.
      expect(titles).not.toContain(testToDelete.title);
    });
  });
  describe("false", () => {
    const notExistingTest = "1234";
    test("DELETE /test/delete/:id - Cuando se trata de eliminar una nota que no existe", async () => {
      const statusCode = 400;
      // Creamos una peticion para borrar un test que no existe
      const deleted = await deleteApi(path,notExistingTest);
      // Se espera que regrese un status code de 400
      checkStatusCode({res:deleted,statusCode });
      // Creamos una peticion para ver los test
      const res = await getApi(getTestPath);
      // Y verificamos si tiene la misma cantidad de test del principio.
      expect(res.body).toHaveLength(initialTest.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
