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
  postTestEmpty
} = require("./helpers/text.js");
const { api, server } = require("./helpers/basic.js");

beforeEach(async () => {
  await Test.deleteMany({});
  for (const test of initialTest) {
    const testObject = new Test(test);
    await testObject.save();
  }
});

describe("GET /test", () => {
//TODO: picar este test en varios
  test("Verifica lo que devuelve y el status code", async () => {
    const res = await getTest();
    expect(res.status).toBe(200);
    expect(res.text).toBe('test');
    expect(JSON.stringify(res.header)).toMatch(/text\/html/i);
  });
});

describe("GET /test/get", () => {
  test("Verifica el status code", async () => {
    const res = await getTests();
    expect(res.status).toBe(200);
  });
  //TODO: Crear una que verifique que no le manden otros stauts code
  test("Verifica la cantidad de objetos devueltos", async () => {
    const res = await getTests();
    expect(res.body).toHaveLength(initialTest.length);
  });
  test("Verifica si el titulo del primer objeto es correcto", async () => {
    const res = await getTests();
    expect(res.body[0].title).toBe(initialTest[0].title);
  });
  test("Verifica si el titulo dado se encuentra en algun objeto", async () => {
    const titles = await getTitlefromTests();
    expect(titles).toContain(initialTest[1].title);
  });
});

describe("POST /test/post", () => {
  test("Verifica si se puede anadir un nuevo objeto", async () => {
      const firstRes = await postTest();
      expect(firstRes.status).toBe(201);
      expect(JSON.stringify(firstRes.header)).toMatch(/application\/json/);
    const res = await getTests();
    const titles = await getTitlefromTests();
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
    const fristRes = await getTests();
    const { body: tests } = fristRes;
    const testToDelete = tests[0];
    await api.delete(`/test/delete/${testToDelete._id}`).expect(204);

    const titles = await getTitlefromTests();
    const secondRes = await getTests();

    expect(secondRes.body).toHaveLength(initialTest.length - 1);
    expect(titles).not.toContain(testToDelete.title);
  });
  test("Cuando se trata de eliminar una nota que no existe", async () => {
    await api.delete(`/test/delete/1234`).expect(400);

    const res = await getTests();

    expect(res.body).toHaveLength(initialTest.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
