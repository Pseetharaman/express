import express from "express";
import cors from "cors"
import userRouter from "./controller/user.route.js"
import { connectDb } from "./database/index.js";

const app = express();

app.use(cors())

app.use(express.json())


app.use('/api/user', userRouter)

app.get("/", (req, res)=>{
	res.send("server is running")
})

app.post("/", (req, res)=>{
	console.log(req.body)
	res.json({serverMessage:req.body.message})
})

app.patch("/", (req, res)=>{
	res.send(req.body);
})

app.listen(8080, () => {
	connectDb();
	console.log("server is up at port 8080");
})
