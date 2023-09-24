const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/environment");

const authModels = require("../models/auth.model");
const { token } = require("morgan");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkRegistered = await authModels.userVerification(email);
    if (checkRegistered.rows.length === 1) {
      res.status(401).json({
        msg: "email sudah terdaftar",
      });
      return;
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    await authModels.createAccount(email, hashedPwd);
    res.status(201).json({
      msg: "pembuatan akun sukses",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkAccount = await authModels.userVerification(email);
    if (checkAccount.rows.length < 1) {
      res.status(401).json({
        msg: "email / password salah",
      });
      return;
    }
    const dataDB = checkAccount.rows[0];
    const checkPwd = await bcrypt.compare(password, dataDB.password);
    if (!checkPwd) {
      res.status(401).json({
        msg: "email / password salah",
      });
      return;
    }
    const dataUser = {
      id: dataDB.id,
      username: dataDB.username,
      email: dataDB.email,
      roleId: dataDB.role_id,
      image: dataDB.image,
    };
    const jwtOptions = { expiresIn: "8h" };
    jwt.sign(dataUser, jwtSecret, jwtOptions, (err, token) => {
      if (err) throw token;
      res.status(200).json({
        msg: `hai ${dataUser.username}`,
        token,
        dataUser,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};
