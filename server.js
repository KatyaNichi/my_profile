const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection = require("./db.js");
const Joi = require("joi");

// connection.query("SELECT * FROM Project", (error, results) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results);
//   }
// });

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

////////////////////////////////////////////////CONTACT FORM VALIDATION
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  message: Joi.string().required(),
});

// POST-request handler
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // validation with joi
  const { error } = contactSchema.validate({ name, email, message });
  if (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  // Saving data in database
  const query = "INSERT INTO contact (Name, Email, Message) VALUES (?, ?, ?)";
  connection.query(query, [name, email, message], (error, results) => {
    if (error) {
      console.error("Failed to save data:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log("Data saved successfully");
    res.status(200).json({ message: "Data saved successfully" });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.delete("/admin/messages/:id", (req, res) => {
  const messageId = req.params.id;

  // Perform the deletion operation in the database
  const query = "DELETE FROM contact WHERE id = ?";
  connection.query(query, [messageId], (error, results) => {
    if (error) {
      console.error("Failed to delete message:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log("Message deleted successfully");
    res.status(200).json({ message: "Message deleted successfully" });
  });
});

app.post("/login", (req, res) => {
  const { mail, password } = req.body;

  const query = "SELECT * FROM User WHERE email = ? AND password = ?";
  connection.query(query, [mail, password], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid password or email" });
    }
  });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/admin.html"));
});
app.get("/admin/messages", (req, res) => {
  // Request to get messages from database
  const query = "SELECT * FROM contact";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Failed to fetch messages from the database:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // send list of messages in JSON
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
