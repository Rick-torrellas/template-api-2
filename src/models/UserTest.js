const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const UserTestSchema = new Schema({
    username: String,
    email: String,
    password: String
}, {
    timestamps: true
})

UserTestSchema.method('encryptPassword', async (password) => {
//TODO: esto podria ser un servicio.
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
})

UserTestSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
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