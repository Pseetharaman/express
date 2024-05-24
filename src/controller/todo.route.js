import express from "express";
import { TodoModel } from "../database/model/todo.model";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, userid } = req.body;

    let isTodo = await TodoModel.findOne({ user: userid });

    if (isTodo) {
      isTodo.todo = [...isTodo.todo, { name: name, done: false, id: uuid() }];
      await isTodo.save();
      return res.json({
        todo: isTodo.todo,
        userid: userid,
        message: "Successfully added",
        success: true,
      });
    }

    const newTodo = await TodoModel.create({
      user: userid,
      todo: [
        {
          name: name,
          done: false,
          id: uuid(),
        },
      ],
    });

    if (!newTodo) {
      return res.json({
        message: "something went wrong, try again later",
        success: false,
      });
    }

    return res.json({
      todo: newTodo.todo,
      userid: userid,
      message: "Successfully added",
      success: true, 
    });
  } catch (error) {
    console.log(error)
    return res.json({
      message: "something went wrong, try again later",
      success: false,
    });
  }
});
