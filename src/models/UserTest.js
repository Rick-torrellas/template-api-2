const {Schema, model} = require("mongoose");
const { encryptPassword, validatePassword } = require("../services/encrypt");

const UserTestSchema = new Schema({
    username: String,
    email: String,
    password: String
}, {
    timestamps: true
})

UserTestSchema.method('encryptPassword', encryptPassword);

UserTestSchema.methods.validatePassword = function(password) {
    const comparedPassword = this.password;
    return validatePassword(password,comparedPassword)
}

UserTestSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const UserTest =  model('UserTest', UserTestSchema);

module.exports = UserTest;