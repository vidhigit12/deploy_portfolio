const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    messages:[]
})


// save message
userSchema.methods.Messagesave = async function(message){
    try {
        this.messages = this.messages.concat({message});
        await this.save();
        return message;
    } catch (error) {
        console.log(error)
    }
}

// create model
const users = new mongoose.model("users",userSchema);

module.exports = users;



// [].concat({message});

// // op=> [{message:"repo.akjsdf"}]