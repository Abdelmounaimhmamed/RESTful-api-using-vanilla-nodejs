const PostsModels = require("../models/postModel");
// const posts = require("../Posts/post.json");


const FetchAllPost = async (req,res) => {
    try {
        const posts = await  PostsModels.getPosts();
        res.writeHead(200 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify(posts));
        res.end();
    } catch (error) {
        res.writeHead(404 , {"Content-type" : "application/json"});
        res.write(JSON.stringify({message : error}));
        res.end();
    }
}

const FetchPostByID = async (req,res,id) => {
    try {
        const PostById = await PostsModels.getPostById(id);
        res.writeHead(200 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify(PostById));
        res.end();

    } catch (error) {
        res.writeHead(404 , {'Content-Type' : "application/json"});
        res.write(JSON.stringify({message : error.message}));
        res.end();
    }
}
const createPost = async (req,res) => {
    try {
        const newPost = {
            title : "create web interface new",
            desc : "yuai iead ndksj lklqd uua "
        }
        const addNewPost = await PostsModels.create(newPost);
        res.writeHead(200 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify(addNewPost));
        res.end();
    } catch (error) {
        res.writeHead(404 ,{"Content-Type" : "application/json"});
        res.write(JSON.stringify({message : error.message}));
        res.end();
    }
}

const deletePost = async (req,res,id) => {
    try {
        const Postes = await PostsModels.deleteP(id);
        res.writeHead(200 , {"Content-Type" : "application/json"});
        res.end(JSON.stringify(Postes));
    } catch (error) {
        res.writeHead(400 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify({statius : error}));
        res.end();
    }
}

const updatePost = async (req,res,id) => {
    try {
        const PostToUpdate = await FetchPostByID(req,res,id);
        
        if (!PostToUpdate){
            res.writeHead(404 , {"Content-Type" : "application/json"});
            res.write(JSON.stringify({message : " postnot found "}))
        }else {
            const data = {
                title : "updated post",
                desc : "updated description " 
            }

            const updateddata = {
                title : data.title,
                desc : data.desc
            };
            
            const Post = await PostsModels.update(id , updateddata);
            res.writeHead(200 , {"Content-Type" : "application/json"});
            // res.end(JSON.stringify({message : `the post is updated ${id}`}));
            res.end(JSON.stringify(Post));
        }
            
    } catch (error) {
        res.writeHead(400 , {"Content-Type" : "application/json"});
        res.write(JSON.stringify({status : error}));
        res.end();
    }
}

module.exports = {
    FetchAllPost,
    FetchPostByID,
    createPost,
    deletePost,
    updatePost
}