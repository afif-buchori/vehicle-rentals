const db = require("../configs/postgre");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT p.id, pb.name AS "brand", p.name, p.vehicle_number, transmision, p.color, pc.name AS "category", price
    FROM products p
    JOIN product_brands pb ON p.brand_id = pb.id
    JOIN product_categories pc ON p.category_id = pc.id`;
    db.query(sqlQuery, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getAllProducts,
};
