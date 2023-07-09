const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let toDo = [];

app.get("/todos", (req,res)=>{
  console.log("your toDO is ", toDo);
  return res.json(toDo);
})

app.post("/todos",(req,res)=>{
  const newToDo = {
    id: Math.floor(Math.random() *10000),
    title: req.body.title,
    description: req.body.description
  }
  toDo.push(newToDo);
  console.log("ToDo is ", toDo);

  return res.status(200).send();
} )

app.delete("/todos/:id", (req,res)=>{
const index = toDo.findIndex(i => i.id === parseInt(req.params.id));
if(index === -1){
  return res.status(404).send();
}
else{
  toDo.splice(index,1);
  console.log("your toDO is ", toDo);
  return res.status(200).send();
}
})

app.listen(3000);


// module.exports = app;
