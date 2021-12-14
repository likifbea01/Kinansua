const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const todoModel = require('./models/todo_model.js');
const { request, response } = require('express');
const { get } = require('express/lib/request');

app.use( bodyParser.json());


app.get('/',(request,response)=>{
    response.send('this is our second api we are building');
});
app.post('/todos',async(request,response)=>{
     const todo = todoModel.create({
        title: request.body.title,
        body: request.body.body,
        status:request.body.status,
        endDate:request.body.endDate
     });
     try{
         const saveTodo = await todo.save();
         response.json({
             data:saveTodo,
             message:"todo successfully created"
         });
     }catch(err){
         response.json({
             message:err
         });
     }
});
app.get('/todos',async(request,response)=>{
    try {
        const getAllTodos=await todoModel.find();
        response.json({
            data:getAllTodos,
            message:"operation successful"
        });
    } catch (err) {
        response.json({
            message:err
        });
    }
});
app.get('/todos',async(request,response)=>{
    try {
        const getAllTodos=await todoModel.findById({_id:request.body.todoId});
        response.json({
            data:getAllTodos,
            message:"operation successful"
        });
    } catch (err) {
        response.json({
            message:err
        });
    }
});
app.delete('/todos/todoId',async(request,response)=>{
    try {
     const deleteTodo= await   todoModel.findoneAndDelete({_id:request.params.todoId})
     response.json({
         data:deleteTodo,
         message:"Todo successfully deleted"
     });
    } catch (err) {
      response.json({
          message:err
      });
    }

});
app.patch('/todo/:todoId',(request,response)=>{
    todoModel.findoneAndDelete({_id:request.params.todoId},{$set:{
        title:request.body.title,
        status:request.body.status,
        body:request.body.body
    }});
});
mongoose.connect(process.env.DB_URL,
()=>console.log('successfully connected'));

app.listen(1002);