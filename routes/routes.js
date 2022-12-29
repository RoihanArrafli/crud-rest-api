const express = require('express');

const router = express.Router()
const bodyParser = require("body-parser")
const Model = require('../models/model.js');

module.exports = router;

//Post Method
router.post("/post",  (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    console.log(req.body);
    try{
        const dataToSave =  data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get all method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch{
        res.status(500).json({message: error.message})
    }
})

//update by id method 
router.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updateData, options
        )

        res.send(result)
    }
    catch{
        res.status(400).json({ message: error.message})
    }
})

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send("Document with ${data.name} has been deleted..")
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})