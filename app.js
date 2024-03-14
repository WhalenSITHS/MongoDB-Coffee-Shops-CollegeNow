const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
require("./db/mongoose"); //ensures mongoose runs and connects
const routes = require("./Routes/index");
//takes raw requests and turns them into usable properties on req.body
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send(req.file);
});
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
