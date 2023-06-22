const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const UserController = require("./controller/userController");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", UserController.register);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
