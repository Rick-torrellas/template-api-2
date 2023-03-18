function hello(name,port,url,mode) {
    console.log(`Server -${name}- mode: -${mode}- | on port ${port} - ${url}`);
}
module.exports = {
    hello
}