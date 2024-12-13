const mongoose = require('mongoose');
const coverLetterSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true,
    },
    companyName:{
        type: String,
        required: true,
    },
    jobDescription:{
       type: String,
       required:true, 
    },
    coverLetterText:{
        type: String,
        required: true,
    },
    createdAt:{
    type: Date,
    defaul: Date.now},

    updatedAt:{
type: Date, 
default: Date.now
    },
});
const Coverletter = mongoose.model('CoverLetter', coverLetterSchema);
module.exports = Coverletter;