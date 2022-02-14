const Meeting = require('./../models/meeting');


module.exports = {
    createMeeting: (req, res) => {
        let newMeeting = new Meeting();
        newMeeting.date = req.body.date
        newMeeting.startTime = req.body.startTime
        newMeeting.endTime = req.body.startTime
        newMeeting.status = 0

        newMeeting.save().then((data) => {
            res.status(200).send({
                data: data
            })
        }).catch(err => {
            res.status(400).send({
                err: err
            })
        })
    },

    getAvailableSlots: (req, res) => {
        let reqDate = req.params.DATE
        Meeting.findAll({date:reqDate,status:1}).then(slots => {
            if(slots.length > 0) {
                res.status(200).send({
                    slots: slots,
                    message: "Slots fetched successfully"
                })
            } else {
                res.status(200).send({
                    slots: slots,
                    message: "There are no available slots for selected date"
                })
            }
        }).catch(err => {
            res.status(400).send({
                err: err
            })
        })
    },

    rescheduleSlots: (req, res) => {
        let existingSlot = {};
        existingSlot.date = req.body.oldDate
        existingSlot.startTime = req.body.oldStartTime
        existingSlot.endTime = req.body.oldEndTime

        let newSlot = {};
        newSlot.date = req.body.newdate;
        newSlot.startTime = req.body.newStartTime;
        newSlot.endTime = req.body.newEndTime;

        Meeting.findOne({date:existingSlot,startTime:existingSlot.startTime, endTime: existingSlot.endTime}).then(slotFound => {
            if(slotFound.status == 1) {
                Meeting.updateOne({_id:slotFound.id},{date:newSlot.date, startTime:newSlot.startTime, endTime: newSlot.endTime}).then(data => {
                    res.status(200).send({
                        data: data,
                        message: "Meeting Rescheduled Successfully"
                    })
                })
            } else {
                res.status(200).send({
                    message: "Provided Slot is not available"
                })
            }
        }).catch(err => {
            res.status(400).send({
                err: err
            })
        })
    },

    cancelMeeting: (req, res) => {
        let provided = {}
        provided.date = req.body.date;
        provided.startTime = req.body.startTime;
        provided.endTime = req.body.endTime;

        Meeting.deleteOne({date:provided.date,startTime:provided.startTime,endTime: provided.endTime}).then((data) => {
            res.status(200).send({
                message: "Meeting Cancelled Successfully"
            })
        }).catch(err => {
            res.status(400).send({
                message: "Not able to cancel the meeting"
            })
        })
    }
}

