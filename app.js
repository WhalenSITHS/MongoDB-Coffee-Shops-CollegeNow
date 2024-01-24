const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const routes = require("./Routes/index");
//takes raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
