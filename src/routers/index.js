const { Router } = require("express");

const welcomeRouter = require("./welcome.route");
const productRouter = require("./product.routes");

const masterRouter = Router();

masterRouter.use("/", welcomeRouter);
masterRouter.use("/products", productRouter);

module.exports = masterRouter;
