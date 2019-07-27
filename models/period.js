const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeriodSchema = new Schema({
    Creator: {
        type: String,
        required: true
    },
    Schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    StartPeriod: {
        type: Date,
        required: true
    },
    EndPeriod: {
        type: Date,
        required: true        
    },
    isAvailablePeriod: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Period', PeriodSchema);