module.exports = (sequelize,Sequelize)=>{
    const order = sequelize.define("order", {
        productId:{
            type : Sequelize.INTEGER
        },
        customerId:{
            type : Sequelize.INTEGER
        },
        tanggal_order:{
            type : Sequelize.DATE
        },
    });
    return order;
}