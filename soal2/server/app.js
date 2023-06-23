require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const UserController = require("./controller/userController");
const { verifyToken } = require("./helpers/jwt");
const svgCaptcha = require("svg-captcha");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/captcha", (req, res) => {
  let captcha = svgCaptcha.create();

  let text = captcha.text;
  let data = captcha.data;

  res.status(200).send({
    data,
    text,
  });
});

app.post("/register", UserController.register);
app.post("/login", UserController.login);

//Authentication:
// app.use((req, res, next) => {
//   try {
//     let { access_token } = req.headers;
//     if (!access_token) {
//       throw { name: "invalidToken" };
//     }
//     let payload = verifyToken(access_token);
//     if (!payload) {
//       throw { name: "invalidToken" };
//     }
//     req.user = payload;
//     next();
//   } catch (error) {
//     if (error.name === "invalidToken" || error.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.get("/", UserController.fetchUsers);
app.delete("/:id", UserController.deleteUser);
app.patch("/:id", UserController.editUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
