const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const order = sequelize.define("order", {
        productId:{
            typeof : Sequelize.INTEGER
        },
        customerId:{
            typeof : Sequelize.INTEGER
        },
        tanggal_order:{
            typeof : Sequelize.DATE
        },
        
    });
}