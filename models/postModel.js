const Posts = require("../Posts/post.json");
const fs = require("fs");

const getPosts = () => {
    return new Promise((resolve , reject) => {
        resolve(Posts);
    });
}


const getPostById = (id) => {
    return new Promise((resolve , reject) => {
        const PostById = Posts.filter(p => p.id == id);
        resolve(PostById);
    });
};

const create = (Post) => {
    return new Promise((resolve , reject) => {
        const PostToAdd = {id : 8 , ...Post };
        Posts.push(PostToAdd);
        fs.writeFileSync("./Posts/post.json" ,JSON.stringify(Posts));
        resolve(PostToAdd);
    });
};
const deleteP =  (id) => {
    return new Promise((resolve , reject) => {
        const NewArry = Posts.filter((p) => p.id !== id);
        fs.writeFileSync("./Posts/post.json" ,JSON.stringify(NewArry));
       
        resolve(NewArry);
    });
}
const update = (id , Post)=> {
    return new Promise((resolve , reject) => {
        const index = Posts.findIndex((p) => p.id === id);
        Posts[index] = {id,...Post};

        fs.writeFileSync("./Posts/post.json" ,JSON.stringify(Posts));
        resolve(Posts[index]);
    })
}

module.exports = {
    getPosts,
    getPostById,
    create,
    deleteP,
    update
};   