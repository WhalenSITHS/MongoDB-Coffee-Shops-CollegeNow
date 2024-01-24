const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(
    `mongodb+srv://whalenwebdev:Siths1234@cluster0.n68odh1.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to DB"));

mongoose.connection.on("error", (err) => {
  console.error(`${err.message}`);
});
