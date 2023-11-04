import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app=express();
const port=3500;
const API="http://localhost:3000";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", async(req,res)=>{
    try{
        const response=await axios.get(`${API}/post`);
        res.render("page.ejs",{
            posts:response.data
        });
    }
    catch(error){
        res.status(404).json(error.response.data);
    }
})
app.get("/new/post",(req,res)=>{
    res.render("page1.ejs")
})
app.post("/create/post", async(req,res)=>{
    try{
        const response=await axios.post(`${API}/createpost`,req.body);
        console.log(response.data);
        res.redirect("/")
    }
    catch(error){
        res.status(404).json({message:"error in posting"})
    }
})
app.get("/edit/post/:id",async(req,res)=>{
    try{
        const response=await axios.get(`${API}/post/${req.params.id}`);
        res.render("page2.ejs",{
            post:response.data
        })
    }
    catch(error){
        console.log(error);
    }
})
app.post("/update/post/:id", async(req,res)=>{
    try{
        await axios.patch(`${API}/update/${req.params.id}`,req.body);
        res.redirect("/")
    }
    catch(error){
        res.status(404).json({message:"error in updating the post"});
    }
})
app.get("/delete/:id",async(req,res)=>{
    try{
        await axios.delete(`${API}/delete/${req.params.id}`);
        res.redirect("/")
    }
    catch(error){
        res.status(400).json({message:"error in deleting posts."})
    }
})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}.`)
})