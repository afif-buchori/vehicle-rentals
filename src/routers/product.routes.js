const { Router } = require("express");
const productRouter = Router();

const productControllers = require("../controllers/product.controller");

productRouter.get("/", productControllers.getAllProducts);

module.exports = productRouter;
