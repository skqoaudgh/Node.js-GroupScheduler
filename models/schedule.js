const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    Creator: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    StartPeriod: {
        type: Date,
        required: true
    },
    EndPeriod: {
        type: Date,
        required: true        
    },
    Comment: {
        type: String,
        required: true
    },
    Image: [{
        type: String,
        required: false
    }],
    Color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);