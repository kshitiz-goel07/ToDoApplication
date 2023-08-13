const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

function findIndex(arr, id){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id == id){
            return i; 
        }
    }
    return -1;
}

function removeIndex(arr, index){
    let newArray = [];
    for(let i=0;i<arr.length;i++){
        if(i != index){
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

app.get('/todos', (req,res)=>{
    fs.readFile("list.json","utf-8",(err,data)=>{
        if(err){
            return err;
        }
        else{
            var result = JSON.parse(data);
        return res.json(result);
        }
    })
});

app.post("/todos",(req,res)=>{
    const newToDo = {
        id : Math.floor(Math.random()*1000),
        title : req.body.title,
        description : req.body.description
    }
    fs.readFile("list.json","utf-8",(err,data)=>{
        if(err){
            return err;
        }
        else{
            const toDo = JSON.parse(data);
            toDo.push(newToDo);
            fs.writeFile("list.json",JSON.stringify(toDo) , (err)=>{
                if(err){
                    return err;
                }
                else{
                    res.status(201).json(newToDo);
                }
            })
        }
    })
})

app.delete("/todos/:id",(req,res)=>{
    fs.readFile("list.json","utf-8",(err,data)=>{
        if(err){
            return err;
        }
        else{
            var toDoList = JSON.parse(data);
          const index = findIndex(toDoList, parseInt(req.params.id));
          if(index === -1){
            res.status(404).send();
          }
          else{
         toDoList = removeIndex(toDoList, index);
         fs.writeFile("list.json", JSON.stringify(toDoList), (err)=>{
            if(err){
                throw err
            }
            res.status(200).send();
         });
          }
        }
    });
});

app.listen(3000);

// let toDo = [];

// app.get("/todos", (req,res)=>{
//   console.log("your toDO is ", toDo);
//   return res.json(toDo);
// })

// app.post("/todos",(req,res)=>{
//   const newToDo = {
//     id: Math.floor(Math.random() *10000),
//     title: req.body.title,
//     description: req.body.description
//   }
//   toDo.push(newToDo);
//   console.log("ToDo is ", toDo);

//   return res.status(200).send();
// } )

// app.delete("/todos/:id", (req,res)=>{
// const index = toDo.findIndex(i => i.id === parseInt(req.params.id));
// if(index === -1){
//   return res.status(404).send();
// }
// else{
//   toDo.splice(index,1);
//   console.log("your toDO is ", toDo);
//   return res.status(200).send();
// }
// })

// app.listen(3000);


// module.exports = app;
