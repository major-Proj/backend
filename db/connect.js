const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/timesheet?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(() => console.log("Connected Successsfully")).catch((err) => console.log(err))
module.exports = {
    mongoose
}