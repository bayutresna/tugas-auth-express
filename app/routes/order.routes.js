const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/order", 
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.getall
    );
  
    app.get(
      "/api/order/detail/:id",
      [authJwt.verifyToken],
      controller.detail
    );
  
    app.delete(
      "/api/order/delete/:id",
      [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.delete
    );
  
    app.post(
      "/api/order/create",
      [authJwt.verifyToken],
      controller.store
    );

    app.put(
        "/api/order/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.update
    )
  };