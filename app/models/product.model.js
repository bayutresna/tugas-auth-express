
module.exports = (sequelize,Sequelize) =>{
    const product = sequelize.define("product",{
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

    });
    return product;
}