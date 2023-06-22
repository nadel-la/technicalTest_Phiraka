const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      let { username, password } = req.body;
      let createUser = await User.create({ username, password });
      res.status(201).json({
        id: createUser.id,
        username: createUser.username,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
