const { authJwt } = require("../middleware");
const controller = require("../controllers/customer.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/customer", 
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.getall
    );
  
    app.get(
      "/api/customer/detail/:id",
      [authJwt.verifyToken],
      controller.detail
    );
  
    app.delete(
      "/api/customer/delete/:id",
      [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.delete
    );
  
    app.post(
      "/api/customer/create",
      [authJwt.verifyToken],
      controller.store
    );

    app.put(
        "/api/customer/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.update
    )
  };