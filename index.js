const express = require('express');
const port = 8000;
const app = express();


const db = require("./config/mongoose.js");
const List = require("./models/list.js");

// setting view engine to ejs
app.set('view engine', 'ejs');

// setting view directory
app.set('views', './views');

// setting static files directory
app.use(express.static('./assets'));
app.use(express.urlencoded());




app.listen(port, function(err){
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})




app.get("/", async function(req, res){
    const list = await List.find({});
    // console.log(list);
    return res.render('home',{
        title: "TO-DO LIST",
        task_list: list,
    });
   
})


// adding task to the databse
app.post("/add-to-list", async function(req,res){
    const dateArr = req.body.date.split('-');
    req.body.date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    const task = await  List.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    })

    await task.save();
    res.redirect("back");
})


// deleting selected tasks to the database
app.get("/delete-tasks", async function(req, res){
    const checkedIds = req.query.ids.split(',');
    for(let id of checkedIds){
        await List.findByIdAndDelete(id);
    }
    res.redirect("back");
})


