function hello(name,port,url,mode) {
    console.log(`Server -${name}- mode: -${mode}- | on port ${port} - ${url}`);
}

function helloDebug () {
    return "Debug activated";
}


module.exports = {
    hello,
    helloDebug
}