const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize) =>{
    const product = sequelize.define("customer",{
        nama:{
            type : Sequelize.STRING
        },
        harga:{
            type: Sequelize.STRING
        },
        uom : {
            type :Sequelize.INTEGER
        },
        stok :{
            type : Sequelize.STRING
        }

    })
}