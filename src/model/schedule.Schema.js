const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        enquiryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enquiry",
            required: true,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
    },
    {timestamps: true}
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;