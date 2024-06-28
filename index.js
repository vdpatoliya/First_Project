require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const {v4 : uuidv4} = require('uuid'); 
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine :","ejs")
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"Public/CSS")))
app.use(express.static(path.join(__dirname,"Public/JS")))

let posts =[
    {
        id: uuidv4(),
        username : "vrajraj",
        content : "I Love Coding!"
    },
    {
        id: uuidv4(),
        username : "Sahil",
        content : "I Love Bardoli"
    },
    {
        id: uuidv4(),
        username : "Harshil",
        content : "I love selected in microsoft!"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/", (req,res)=>{
    res.redirect("/posts");
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});  
    // console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{ post }) 
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContect = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContect;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{ post }) 
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts  = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log(`listining to port : ${port}`);
});