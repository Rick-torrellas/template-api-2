const bcrypt = require("bcryptjs");


const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const validatePassword = (password, comparedPassword) => {
    return bcrypt.compare(password, comparedPassword);
}

module.exports = {
    encryptPassword,
    validatePassword
}