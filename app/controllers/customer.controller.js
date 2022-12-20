const db = require("../models");
const config = require("../config/auth.config");
const customer = db.customer;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getall = (req,res)=>{
  customer.findAll()
  .then(customer=>{
    if(customer.length > 0){
      res.send({message : "Data Customer ", data : customer})
    } else{
      res.send({ message: "Data Customer Kosong" });
    }
  })
  .catch(err =>{
    res.status(500).send({ message: err.message });
  });
};

exports.detail = (req,res)=> {
  const id = parseInt(req.params.id)
    customer.findOne({
        where:{
            id : id
        }
    })
    .then(customer =>{
      if(customer){
        res.send({
          message : "Data Customer Available",
          data : customer
        });
      } else{
        res.send({message : "Data Customer not Found"});
      }
    })
    .catch( err=>{
      res.status(500).send({message : err.message});
    });
};

exports.store = (req, res) => {
  // Save User to Database
  customer.create({
    nama: req.body.nama,
    alamat: req.body.alamat,
    nohp: req.body.nohp
  })
    .then(()=> {res.send({ message: "Customer was registered successfully!" });})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req,res)=> {
    const id = parseInt(req.params.id)
    customer.findOne({
        where:{
            id : id
        }
    })
    .then(customer => {
        if (!customer) {
          return res.status(404).send({ message: "Customer Not found." });
        }
        customer.update({
          nama: req.body.nama,
          alamat: req.body.alamat,
          nohp: req.body.nohp
        })
        .then(()=> {res.send({ message: "Customer was updated successfully!" });})
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })  
};

exports.delete = (req,res) =>{
  const id = parseInt(req.params.id)
  customer.findOne({
      where:{
          id : id
      }
  })
  .then(customer => {
    if(customer){
      customer.destroy({ where : { id:id } })
        .then(customer => {
          res.send({
            message : 'data sudah dihapus',
          });
        })
        .catch( err =>{
          res.status(500).send({message : err.message});
        })
    }
    else{
      res.send({
        message : 'data customer tidak ada'
      });
    };
  })
};


