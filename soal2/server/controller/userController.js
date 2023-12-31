const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

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
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      let { username, password } = req.body;
      if (!username || !password) {
        throw { name: "invalidInput" };
      }
      let findUser = await User.findOne({
        where: {
          username,
        },
      });
      if (!findUser) {
        throw { name: "invalidName/Pass" };
      }
      let validatePass = comparePassword(password, findUser.password);
      if (!validatePass) {
        throw { name: "invalidName/Pass" };
      }
      let access_token = signToken({
        id: findUser.id,
        username: findUser.username,
        password: findUser.password,
      });

      res.status(200).json({ access_token: access_token });
    } catch (error) {
      if (error.name == "invalidInput") {
        return res
          .status(401)
          .json({ message: "Name or Password is required" });
      }
      if (error.name === "invalidName/Pass") {
        return res.status(400).json({ message: "Invalid Name/password" });
      }
    }
  }

  static async fetchUsers(req, res) {
    try {
      let getUsers = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(getUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      let { id } = req.params;
      let findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "notFound" };
      }

      await User.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error.name === "notFound") {
        return res.status(404).json({ message: "Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async editUser(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      console.log("<<<<<<<", username);
      if (!username) {
        throw { name: "notFound" };
      }

      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "notFound" };
      }

      await User.update(
        { username },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        msg: `Name updated successfully from ${findUser.username} to ${username}`,
      });
    } catch (error) {
      if (error.name === "notFound") {
        return res.status(404).json({ message: "Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
