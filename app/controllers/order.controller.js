const db = require("../models");
const order = db.order;

const Op = db.Sequelize.Op;


exports.getall = (req,res)=>{
  order.findAll()
  .then(order=>{
    if(order.length > 0){
      res.send({message : "Data order ", data : order})
    } else{
      res.send({ message: "Data order Kosong" });
    }
  })
  .catch(err =>{
    res.status(500).send({ message: err.message });
  });
};

exports.detail = (req,res)=> {
  const id = parseInt(req.params.id)
    order.findOne({
        where:{
            id : id
        }
    })
    .then(order =>{
      if(order){
        res.send({
          message : "Data order Available",
          data : order
        });
      } else{
        res.send({message : "Data order not Found"});
      }
    })
    .catch( err=>{
      res.status(500).send({message : err.message});
    });
};

exports.store = (req, res) => {
  // Save User to Database
  order.create({
    productId: req.body.productId,
    customerId: req.body.customerId,
    tanggal_order: req.body.tanggal_order
  })
    .then(()=> {res.send({ message: "order was registered successfully!" });})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req,res)=> {
    const id = parseInt(req.params.id)
    order.findOne({
        where:{
            id : id
        }
    })
    .then(order => {
        if (!order) {
          return res.status(404).send({ message: "order Not found." });
        }
        order.update({
            productId: req.body.productId,
            customerId: req.body.customerId,
            tanggal_order: req.body.tanggal_order
        })
        .then(()=> {res.send({ message: "order was updated successfully!" });})
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })  
};

exports.delete = (req,res) =>{
  const id = parseInt(req.params.id)
  order.findOne({
      where:{
          id : id
      }
  })
  .then(order => {
    if(order){
      order.destroy({ where : { id:id } })
        .then(order => {
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
        message : 'data order tidak ada'
      });
    };
  })
};


