var express = require("express");
var app = express();
var fs = require('fs')


const dataJson = fs.readFileSync('./db.json')
const data = JSON.parse(dataJson)

const routerJob = express.Router();

routerJob.get("/jobs", (req, res) => {
  res.status(200).json({
    message:"ok",
    data:data.listJob
  });
})


routerJob.post("/jobs",(req,res,next)=>{
    const ojb=req.body
    if (ojb.nameJob=="") {
        res.status(400).json({
            message:"Khong co ten job,Them that bai"
        })
    }else{
        next()
    }
}, (req, res,) => {
    let check=data.listJob.findIndex(item=>item.nameJob===req.body.nameJob)
    if (check==-1) {
        data.listJob.push(req.body)
        fs.writeFileSync('./db.json',JSON.stringify(data))

        res.status(201).json({
            message:"them thanh cong"
        })
    }else{
        res.status(400).json({
            message:"job da ton tai"
        })
    }
})

routerJob.put("/jobs",(req,res)=>{
    data.listJob=req.body
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(201).json({
        message:"thanh cong",
        data:data.listJob
    })
})

routerJob.put("/jobs/:id", (req, res) => {
    const a=req.params.id
    let index= data.listJob.findIndex(e=>e.id==a)
    console.log(index);
    if (index!=-1) {
        data.listJob[index]=req.body
        fs.writeFileSync('./db.json',JSON.stringify(data))

        res.status(200).json({
            message:"sua thanh cong",
            data:data.listJob
        })
    }else{
        res.status(400).json({
            message:"khong tim thay job"
        })
    }
})
routerJob.delete("/jobs/:id", (req, res) => {
    let a=req.params.id
    let arr=data.listJob.filter(item=>item.id!=a)
    data.listJob=arr
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(200).json({
        message:"xoa thanh cong"
    })
})
routerJob.delete("/jobs", (req, res) => {
    data.listJob=[]
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(200).json({
        message:"xoa thanh cong"
    })
})
module.exports = routerJob