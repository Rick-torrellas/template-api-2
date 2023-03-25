// Le puse text, por que si no jest lo ejecuta
const {getApi,postApi, deleteApi} = require('./basic.js');

const initialTest = [
    {
        title: "Primer Test"
    },
    {
        title: "Segundo Test"
    }
];
const newTest = {
    title: 'Tercer Test'
}
const newTestEmpty = {}
// La ruta para pedir los test
const getTestsPath = '/test/get';
const getTestPath = '/test';
const postTestPath = "/test/post";

const getTest = async () => {
    return await getApi(getTestPath);
}
// Para obtener los tests de la api
const getTests = async () => {
    return await getApi(getTestsPath);
}
const getTitlefromTests = async () => {
    const res = await getTests();
    return res.body.map(test => test.title);
}
const postTest = async () => {
    return await postApi(postTestPath,newTest)
}
const postTestEmpty = async () => {
    return await postApi(postTestPath,newTestEmpty);
}
const deleteNotExistingTest = async () => {
    return await deleteApi('/test/delete','1234')
}
module.exports = {
    initialTest,
    getTitlefromTests,
    getTests,
    getTest,
    newTest,
    postTest,
    postTestEmpty,
    deleteNotExistingTest
}