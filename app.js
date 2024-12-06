const express = require("express");
const path = require("path");
const { router } = require("./router");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "view")));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
}); 

