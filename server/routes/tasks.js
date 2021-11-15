const Task = require('../models/task');
const express = require('express');
const router = express.Router();

router.post("/", async(req,res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

router.get("/", async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put("/:id", async (req, res) => {
    try{
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        );
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

module.exports = router;