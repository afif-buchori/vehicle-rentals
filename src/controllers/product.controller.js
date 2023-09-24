const productModels = require("../models/product.models");

const getAllProducts = async (req, res) => {
  try {
    const result = await productModels.getAllProducts();
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllProducts,
};
