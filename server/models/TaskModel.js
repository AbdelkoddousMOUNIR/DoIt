const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    userId: {
        type : String,
        required : true
    },
    isCompleted: {
        type : Boolean,
        default : false
    }
})
module.exports = mongoose.model("Task" , TaskSchema)