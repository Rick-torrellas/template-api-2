const mongoose = require("mongoose");
const { describe } = require("node:test");
const Test = require("./../models/Test.js");
const { initialTest, newTest, newTestEmpty, paths, editedTest } = require("./helpers/test.js");
const {
  server,
  deleteApi,
  checkStatusCode,
  getApi,
  postApi,
  checkFormatRes,
  checkLength,
  compareValues,
  checkValuesToContain,
  checkLengthPlus,
  checkLengthMinus,
  checkValuesNotToContain,
  putApi,
} = require("./helpers/basic.js");

beforeEach(async () => {
  await Test.deleteMany({});
  for (const test of initialTest) {
    const testObject = new Test(test);
    await testObject.save();
  }
});

describe("GET /test", () => {
  describe("true", () => {
    test("GET /test - true - Verifica que la peticion se cumple correctamente", async () => {
      const { status, text, header } = await getApi(paths.get);
      const statusCode = 200;
      const expectedContent = "test";
      const expectedFormat = "html";

      checkStatusCode(status, statusCode);
      compareValues(text, expectedContent);
      checkFormatRes(header, expectedFormat);
    });
  });
});

describe("GET /test/get", () => {
  const path = "/test/get";
  describe("true", () => {
    test("GET /test/get - true - Verifica que la peticion se ejecuta correctamente", async () => {
      const { status, body, header } = await getApi(path);
      const statusCode = 200;
      // Obtengo las propiedades titles de mis test.1
      const titles = body.map((test) => test.title);
      const valueToContain = initialTest[1].title;
      const expectedLength = initialTest.length;
      const expectedProp = initialTest[0].title;
      const comparedProp = body[0].title;
      const expectedResFormat = "json";

      checkStatusCode(status, statusCode);
      // Que contenga la cantidad de propiedades
      checkLength(body, expectedLength);
      // Que la propiedad espesifica tenga el titulo
      compareValues(comparedProp, expectedProp);
      // Que devuelva un json
      checkFormatRes(header, expectedResFormat);
      // Que alguna de las propiedades tenga el titulo
      checkValuesToContain(titles, valueToContain);
    });
  });
});

describe("GET /test/get/:id", () => {
  describe("true", () => {
    test("GET /test/get/:id - true - Verificando que la peticion se cumple" , async () => {
      const { body: tests } = await getApi(paths.getTest);
      const espesificTest = tests[0];
      const {body: test,status: testStatus,header: testHeader} = await getApi(`${paths.getTest}/${espesificTest._id}`);
      const espesificTitle = test.title;
      const compareTitle = initialTest[0].title; 
      const statusCode = 200;
      const resFormat = "json";

      checkStatusCode(testStatus,statusCode);
      compareValues(espesificTitle,compareTitle);
      checkFormatRes(testHeader,resFormat);
    });
  })
})

describe("PUT /test/edit/:id", () => {
  describe("true", () => {
    test("PUT /test/edit/:id - Verifica si se edita el test espesifico", async () => {
      // TODO: todo este proceso se podria transformar en una funcion.
      const { body: tests } = await getApi(paths.getTest);
      const espesificTest = tests[0];
      const {body: testBody} = await getApi(`${paths.getTest}/${espesificTest._id}`);
      const testToEditId = testBody._id;
      const putPath = `${paths.putTest}/${testToEditId}`
      await putApi(putPath,editedTest);

      // Verificar el status code del put

      // Verificar qeu la respuesta sea un json.
      // Verificar que el nuevo titulo no sea el viejo
      // Verificar que el nuevo titulo sea el correcto
      

    });
  });
});

describe("POST /test/post", () => {
  const path = "/test/post";
  const getTestPath = "/test/get";
  describe("true", () => {
    test("POST /test/post - true - Verifica el si se creo el objeto", async () => {
      const { header, status } = await postApi(path, newTest);
      const { body } = await getApi(getTestPath);
      const statusCode = 201;
      const titles = await body.map((test) => test.title);
      const formatType = "json";
      const addedLength = initialTest.length;
      const checkProp = newTest.title;

      checkStatusCode(status, statusCode);
      checkFormatRes(header, formatType);
      checkLengthPlus(body, addedLength);
      checkValuesToContain(titles, checkProp);
    });
  });
  describe("false", () => {
    test("POST /test/post - false - Verifica que el objeto sin titulo no sea anadido", async () => {
      const { status } = await postApi(path, newTestEmpty);
      const statusCode = 400;
      const { body } = await getApi(getTestPath);
      const expectedLength = initialTest.length;

      checkStatusCode(status, statusCode);
      checkLength(body, expectedLength);
    });
  });
});

describe("DELETE /test/delete/:id", () => {
  const path = "/test/delete";
  const getTestPath = "/test/get";
  describe("true", () => {
    test("DELETE /test/delete/:id - true - Verifica si un test puede eliminarse", async () => {
      // Buscamos el test que quieremos eliminar
      const { body: tests } = await getApi(getTestPath);
      const testToDelete = tests[0];
      // Hacemos la peticion para eliminarlo
      const { status } = await deleteApi(path, testToDelete._id);
      // Verificamos si se elimino, haceindo otra peticion get
      const { body } = await getApi(getTestPath);
      const titles = await body.map((test) => test.title);
      const statusCode = 204;
      const checkLength = initialTest.length;
      const checkTitle = testToDelete.title;

      checkStatusCode(status, statusCode);
      // Espera que el total de test sea menos uno, que es el test que se elimino.
      checkLengthMinus(body, checkLength);
      // Se verifica si esta el titulo del test que se elimino.
      checkValuesNotToContain(titles, checkTitle);
    });
  });
  describe("false", () => {
    const notExistingTest = "1234";
    test("DELETE /test/delete/:id - false - Cuando se trata de eliminar una nota que no existe", async () => {
      const statusCode = 400;
      // Creamos una peticion para borrar un test que no existe
      const {status: deletedStatus} = await deleteApi(path, notExistingTest);
      // Creamos una peticion para ver los test
      const {body: getBody} = await getApi(getTestPath);
      const checkInitialLength = initialTest.length;

      // Se espera que regrese un status code de 400
      checkStatusCode(deletedStatus, statusCode);
      // Y verificamos si tiene la misma cantidad de test del principio.
      checkLength(getBody,checkInitialLength);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
