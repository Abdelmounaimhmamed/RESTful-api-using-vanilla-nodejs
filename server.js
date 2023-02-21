const http = require("http");
const Port = process.env.PORT || 3000 ;
const {FetchAllPost,FetchPostByID,createPost,deletePost,updatePost} = require("./controllers/postControl");


const server = http.createServer((req,res) => {
    
    if (req.url === "/api/posts/" && req.method === "GET"){
      FetchAllPost(req,res);
    }
    else if(req.url.match(/\/api\/posts\/([0-9])/) && req.method === "GET"){
        const id = req.url.split("/")[3];
        console.log(id);
        FetchPostByID(req,res,id);
    }
    else if( req.url === "/api/posts/" && req.method === "POST"){
        createPost(req,res);
    }
    else if (req.url.match(/\/api\/posts\/([0-9])/) && req.method === "DELETE"){
        const id1 = req.url.split("/")[3];
        console.log(id1);
        deletePost(req,res,id1);
    }
    else if (req.url.match(/\/api\/posts\/([0-9])/) && req.method === "PUT"){
        const id1 = req.url.split("/")[3];
        updatePost(req,res,id1);
    }
    else {
        res.writeHead(404 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify({stack : "not found"}));
        res.end();
    }
});



server.listen(Port , () => {
    console.log(`App running on Port ${Port}`);
})