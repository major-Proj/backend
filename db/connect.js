const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027"
mongoose.connect(conn_str).then(() => console.log("Mongo connection Successsfully")).catch((err) => console.log(err))
module.exports = {
    mongoose
}
