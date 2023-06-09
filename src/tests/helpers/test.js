// Le puse text, por que si no jest lo ejecuta

/**
 * La base de datos inicial de Test.
 */
const initialTest = [
    {
        title: "Primer Test"
    },
    {
        title: "Segundo Test"
    }
];

/**
 * El test usado para testear las peticiones post.
 */
const newTest = {
    title: 'Tercer Test'
}
/**
 * Un test vacio usado para verificar que pasa, cuando intentas crear un test vacio.
 */
const newTestEmpty = {}

const editedTest = {
    title: 'Test Editado'
}

const paths = {
    get: "/test",
    getTest: '/test/get',
    postTest: '/test/post',
    putTest: '/test/edit',
    deleteTest: '/test/delete'
}

module.exports = {
    initialTest,
    newTest,
    newTestEmpty,
    paths,
    editedTest
}