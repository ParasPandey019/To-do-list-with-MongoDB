const express = require('express');
const port = 8000;
const app = express();


const db = require("./config/mongoose.js");
const List = require("./models/list.js");

app.set('view engine', 'ejs');
app.set('views', './views');
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
        title: "To-do List",
        task_list: list,
    });
   
})



app.post("/add-to-list", async function(req,res){
    const task = await  List.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    })

    await task.save();
    res.redirect("back");
})


app.get("/delete-tasks", async function(req, res){
    const checkedIds = req.query.ids.split(',');
    for(let id of checkedIds){
        await List.findByIdAndDelete(id);
    }
    res.redirect("back");
})


