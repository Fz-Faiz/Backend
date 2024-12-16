const http = require("http");
const fs = require("fs");
const url = require("url")

// Express

const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    return res.send("hello from home page");
})
app.get("/about",(req,res)=>{
    return res.send("hello from About Page "+req.query.name);
})

function myHandler(req,res){
    if(req.url === "/favicon.ico") return res.end();
    const log =`${Date.now()}: ${req.url} ${req.method} New Req Received\n`;
    const myUrl = url.parse(req.url,true)
    console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data)=>{

        switch(myUrl.pathname){
            case "/":
                res.end("homePage");
                break;
            case "/about":
                const username = myUrl.query.name;

                res.end(`hi,${username}`);
                break;
            default:
                res.end("404 Error Not Found")
        }

    })
}

// const myServer = http.createServer(app);



// myServer.listen(8000,()=> console.log("Server Started!"))

app.listen(8000,()=>console.log("Server Started!"));

