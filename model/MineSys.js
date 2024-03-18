const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "offline",
    },
})

const MineSys = model("MineSys", MineSchema);
// export default MineSys;
module.exports = MineSys