const express = require('express');
const meeting = require('./../controllers/meeting');

const app = express()


///Routes


app.post('/scheduleMeeting', meeting.createMeeting);

app.get('/getAvailableSlots/:DATE', meeting.getAvailableSlots);

app.post('/rescheduleSlot', meeting.rescheduleSlots);

app.post('/cancelMeeting', meeting.cancelMeeting);

module.exports = app;