import express from 'express'
import bodyParser from 'body-parser'

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let posts=[
    {
        id:1,
        sports:"cricket",
        player:"Cricket, a sport with a history that spans centuries, has evolved from a leisurely pastime to a global phenomenon that unites people across continents. Its rich heritage, marked by iconic rivalries and legendary players, has shaped the way the game is perceived and played today. Let's take a journey through the compelling narrative of cricket and explore its significant milestones.",
        playername:"Nirmal",
        date: new Date()
    },
    {
        id:2,
        sports:"kabaddi",
        player:"Kabaddi, an ancient sport that originated in India, has transcended cultural boundaries to become a global sensation, captivating audiences with its raw energy and captivating maneuvers. With a history deeply rooted in Indian folklore and tradition, Kabaddi has evolved into a highly competitive sport that showcases both physical prowess and strategic acumen. Let's delve into the rich history and modern allure of this exhilarating game.",
        playername:"Nirmal",
        date: new Date()
    },
    {
        id:3,
        sports:"football",
        player:"Football, also known as soccer in some parts of the world, is not merely a sport; it is a global phenomenon that transcends borders, cultures, and languages. With its rich history and passionate fan base, football has become an integral part of many societies, igniting a fervor that unites people from all walks of life. Let's delve into the compelling narrative of this beautiful game and explore its enduring impact on the world stage.",
        playername:"Nirmal",
        date: new Date()
    },
];
 
let lastid=3

app.get("/post",(req,res)=>{
    res.json(posts);
});
app.post("/createpost",(req,res)=>{
    let newid=lastid+1;
    const post={
        id:newid,
        sports:req.body.sports,
        player:req.body.player,
        playername:req.body.playername,
        date:new Date()
    }
    lastid=newid;
    posts.push(post);
    res.json(post);
});
app.get("/post/:id",(req,res)=>{
    const post=posts.find((p)=> p.id===parseInt(req.params.id));
    res.json(post);
})
app.patch("/update/:id",(req,res)=>{
    let post=posts.find((p)=> p.id===parseInt(req.params.id));
    console.log(post);
    if(!post) return res.status(404).json({message:"post is not found"})
    if(req.body.sports) post.sports=req.body.sports;
    if(req.body.player) post.player=req.body.player;
    if(req.body.playername) post.playername=req.body.playername;
    res.json(post);
});
app.delete("/delete/:id",(req,res)=>{
    console.log(req.params.id);
    const index=posts.findIndex((p)=>p.id===parseInt(req.params.id))
    if(index==-1) return res.status(404).json({ message: "Post not found" });
    posts.splice(index,1);
    res.json({message:"posts is deleted"})
})
app.listen(port,()=>{
    console.log(`the server is running on port ${port}.`)
})