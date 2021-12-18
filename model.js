const mongoose = require('mongoose')

const BC_Schema = new mongoose.Schema({
    preHash : {
        type : String,
        required : true
    },
    data: {
        email : {
            type : String,
            required : true
        },
        value: {
            type : Number,
            required : true
        }
        // isGenesis : {
        //     type : Boolean,
        //     default : true
        // }
    },
    time : {
        type : Date,
        default : Date.now()
    },
    hash : {
        type : String,
        required : true
    },
    mineVar : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('History_mine',BC_Schema,'History_mine')
