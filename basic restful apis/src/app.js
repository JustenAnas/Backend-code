//server ko create krna

const express = require("express");
const noteModel = require("./model/note.model")


const app = express();
app.use(express.json()); //middleware (make readable data to express)

const notes = [];

// with mongodb

/*

POST/notes => create a note
GET/notes => get all note
DELETE/notes/:id => delete a note 
PATCH/notes/:id => Update a note

*/

app.post('/notes',async(req,res)=>{
    const data = req.body 
    await noteModel.create({
        title : data.title,
        description : data.description 
    })
    res.status(201).json({
        message:"note created"
    })
})

app.get('/notes',async(req,res)=>{

    const notes = await noteModel.find()// send data in the form of array  
    res.status(200).json({
        message : "notes fetched successfully",
        notes : notes
    })

})

app.delete('/notes/:id',async(req,res)=>{

     const id = req.params.id
     await noteModel.findOneAndDelete({
        _id: id
     })

     res.status(200).json({
        message:"note deleted successfully"
     })
})

app.patch('/notes/:id',async(req,res)=>{

     const id = req.params.id
     const description = req.body.description

     await noteModel.findOneAndUpdate({
        _id:id
     },{
        description:description
     })
     res.status(200).json({
        message:"message updated successfully"
     })
})

// without mongodb
// app.post('/notes',(req,res)=>{
//      notes.push(req.body);

//      res.status(201).json({
//         message:"note created successfully"
//      })

// })

// app.get('/notes',(req,res)=>{
//      res.status(200).json({
//         message: "notes fetched successfully",
//         notes : notes
//      })
// })

// delete /notes/:index

// app.delete('/notes/:index',(req,res)=>{

//     const index = req.params.index

//     delete notes[index]

//     res.status(200).json({
//         message: "note deleted successfully"
//     })
// })

// app.patch('/notes/:index',(req,res)=>{

//     const index = req.params.index
//     const description = req.body.description

//     notes[index].description = description

//     res.status(200).json({
//         message : "message updated successfully"
//     })

// })

module.exports = app;
