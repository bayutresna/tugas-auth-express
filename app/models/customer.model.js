module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define("customers", {
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      nohp: {
        type: Sequelize.STRING
      }
    });
  
    return customer;
  };