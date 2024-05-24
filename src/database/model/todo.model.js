import mongoose from "mongoose";

const todoSchema  = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: "user",  require:true},
    todo:[
        {
            name:{type:String, require:true},
            done:{type:Boolean, require:true},
            createdAt:{type:Date, default:Date.now()}, 
            id:{type:String, require:true}
        } 
    ],
})

export const TodoModel = mongoose.model("todo", todoSchema); 