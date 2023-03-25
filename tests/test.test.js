const mongoose = require("mongoose");
const { describe } = require("node:test");
const Test = require("./../models/Test.js");
const {
  initialTest,
  getTitlefromTests,
  getTests,
  getTest,
  newTest,
  postTest,
  postTestEmpty,
  deleteNotExistingTest,
} = require("./helpers/text.js");
const { api, server, deleteApi, checkStatusCode, status200 } = require("./helpers/basic.js");

beforeEach(async () => {
  await Test.deleteMany({});
  for (const test of initialTest) {
    const testObject = new Test(test);
    await testObject.save();
  }
});

describe("GET /test", () => {
  describe("cuando sale todo bien", () => {
    test("GET /test - Verifica el status code", async () => {
      const res = await getTest();
      const {positiveCode,noCode} = status200;
      const code = {
        res,
        positiveCode,
        noCode
      }
      
      checkStatusCode(code);
    }) 
    test("GET /test - Verifica la respuesta", async () => {
      const res = await getTest();
      expect(res.text).toBe("test");
      expect(JSON.stringify(res.header)).toMatch(/text\/html/i);
    });

  });
});

describe("GET /test/get", () => {
  describe("Lo que debe pasar", () => {
    test("GET /test/get - Verfica que el status code es correcto", async () => {
      const res = await getTests();
      const {positiveCode,noCode} = status200;
      const code = {
        res,
        positiveCode,
        noCode
      }

      checkStatusCode(code);
    });
    test("GET /test/get - Verfica que el contenido devuelto es correcto", async () => {
      const res = await getTests();
      const titles = await getTitlefromTests();
      
// TODO: Transformar todo esto en una funcion.
      // Que contenga la cantidad de propiedades
      expect(res.body).toHaveLength(initialTest.length);
      // Que la propiedad espesifica tenga el titulo
      expect(res.body[0].title).toBe(initialTest[0].title);
      // Que devuelva un json
      expect(res.header['content-type']).toMatch(/application\/json/);
      // Que alguna de las propiedades tenga el titulo
      expect(titles).toContain(initialTest[1].title);
    });
  });
});

describe("POST /test/post", () => {
  test("Verifica si se puede anadir un nuevo objeto", async () => {
    const firstRes = await postTest();
    const res = await getTests();
    const titles = await getTitlefromTests();

    expect(firstRes.status).toBe(201);
    expect(JSON.stringify(firstRes.header)).toMatch(/application\/json/);
    expect(res.body).toHaveLength(initialTest.length + 1);
    expect(titles).toContain(newTest.title);
  });
  test("Verifica que el objeto sin titulo no sea anadido", async () => {
    const create = await postTestEmpty();
    expect(create.status).toBe(400);
    const res = await api.get("/test/get");
    expect(res.body).toHaveLength(initialTest.length);
  });
});
describe("DELETE /test/delete/:id", () => {
  test("Verifica si un test puede eliminarse", async () => {
    // Crea una peticion para eliminar el test
    const { body: tests } = await getTests();
    const testToDelete = tests[0];
    const res = await deleteApi("/test/delete", testToDelete._id);
    // Espera que responda un status code de 204 trans su eliminacion
    expect(res.status).toBe(204);
    // Crea una peticion para verificar si se elimino
    const titles = await getTitlefromTests();
    const secondRes = await getTests();
    // Espera que el total de test sea menos uno, que es el test que se elimino.
    expect(secondRes.body).toHaveLength(initialTest.length - 1);
    // Se verifica si esta el titulo del test que se elimino.
    expect(titles).not.toContain(testToDelete.title);
  });
  test("Cuando se trata de eliminar una nota que no existe", async () => {
    // Creamos una peticion para borrar un test que no existe
    const deleted = await deleteNotExistingTest();
    // Se espera que regrese un status code de 400
    expect(deleted.status).toBe(400);
    // Creamos una peticion para ver los test
    const res = await getTests();
    // Y verificamos si tiene la misma cantidad de test del principio.
    expect(res.body).toHaveLength(initialTest.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
