//making the model, so I can enforce a schema on the database
//makes life a bit easy in terms of dataflow

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
    }, 
    { collection: 'users'}
)

//importing the file
const model = mongoose.model('UserSchema', UserSchema)

//then using the model
module.exports = model