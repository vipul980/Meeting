const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    startTime: {type: Date},
    endTime: {type: Date},
    date: {type: Date},
    status: {type: Boolean}
})

module.exports = mongoose.model('Meeting', meetingSchema);