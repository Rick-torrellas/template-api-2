const {Schema, model} = require("mongoose");

const TestSchema = new Schema({
    title: {type: String},
}, {
    timestamps: true
})

TestSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Test =  model('Test', TestSchema);

module.exports = Test;