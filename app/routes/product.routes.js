const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/product", 
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.getall
    );
  
    app.get(
      "/api/product/detail/:id",
      [authJwt.verifyToken],
      controller.detail
    );
  
    app.delete(
      "/api/product/delete/:id",
      [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.delete
    );
  
    app.post(
      "/api/product/create",
      [authJwt.verifyToken],
      controller.store
    );

    app.put(
        "/api/product/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.update
    )
  };