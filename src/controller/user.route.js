import express from "express"
import { UserModel } from "../database/model/user.model.js";
 const router = express.Router();

router.post("/login", async(req, res)=>{
    const {email, password, username} = req.body;

    if(username!=""){
        let newUser = await UserModel.create({
            email:email,
            password:password,
            username:username
        });


        if(!newUser) {
            return res.json({message:"Unable to create an user", success:false});
        }

// 
// const {password ps, ...userwithoutpassword} = newUser;

        return res.json({message:"Successfully created user",user: newUser , success:true});
    }


    const exitingUser = await UserModel.findOne({email:email, password:password});

    if(!exitingUser) {
        return res.json({message:"User not found 404", success:false});
    }

    return res.json({message:"Successfully logged In.",user:exitingUser, success:true});

})

export default router;
