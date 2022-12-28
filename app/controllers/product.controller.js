const db = require("../models");
const product = db.product;

const Op = db.Sequelize.Op;


exports.getall = (req,res)=>{
  product.findAll()
  .then(product=>{
    if(product.length > 0){
      res.send({message : "Data product ", data : product})
    } else{
      res.send({ message: "Data product Kosong" });
    }
  })
  .catch(err =>{
    res.status(500).send({ message: err.message });
  });
};

exports.detail = (req,res)=> {
  const id = parseInt(req.params.id)
    product.findOne({
        where:{
            id : id
        }
    })
    .then(product =>{
      if(product){
        res.send({
          message : "Data product Available",
          data : product
        });
      } else{
        res.send({message : "Data product not Found"});
      }
    })
    .catch( err=>{
      res.status(500).send({message : err.message});
    });
};

exports.store = (req, res) => {
  // Save User to Database
  product.create({
    productId: req.body.productId,
    customerId: req.body.customerId,
    tanggal_product: req.body.tanggal_product
  })
    .then(()=> {res.send({ message: "product was registered successfully!" });})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req,res)=> {
    const id = parseInt(req.params.id)
    product.findOne({
        where:{
            id : id
        }
    })
    .then(product => {
        if (!product) {
          return res.status(404).send({ message: "product Not found." });
        }
        product.update({
            productId: req.body.productId,
            customerId: req.body.customerId,
            tanggal_product: req.body.tanggal_product
        })
        .then(()=> {res.send({ message: "product was updated successfully!" });})
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })  
};

exports.delete = (req,res) =>{
  const id = parseInt(req.params.id)
  product.findOne({
      where:{
          id : id
      }
  })
  .then(product => {
    if(product){
      product.destroy({ where : { id:id } })
        .then(product => {
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
        message : 'data product tidak ada'
      });
    };
  })
};


