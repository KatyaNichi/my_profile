const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/admin.html"));
});

app.post("/", (req, res) => {
  const { mail, password } = req.body;
  console.log(password);
  if (mail === "katka@mail.se" && password === "k1a2t3k4a5") {
    console.log("redir ");
    res.redirect("/admin");
    //
    //  res.sendFile(path.join(__dirname, "./public/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "./public/index.html")); // Возвращение на страницу входа с сообщением об ошибке
  }
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/admin.html")); // Отправка файла admin.html
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
