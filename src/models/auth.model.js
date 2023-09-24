const db = require("../configs/postgre");

const userVerification = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    db.query(sqlQuery, [email], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const createAccount = (email, password) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
    const defaultUsername = email.split("@");
    const values = [defaultUsername[0], email, password];
    db.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT password FROM users WHERE id = $1";
    db.query(sqlQuery, [userId], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  createAccount,
  getPassword,
};
