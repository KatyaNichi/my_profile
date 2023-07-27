
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const pool = require("./db.js");
const Joi = require("joi");
const http = require('http');

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

////////////////////////////////////////////////contact form validation
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  message: Joi.string().required(),
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const { error } = contactSchema.validate({ name, email, message });
  if (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const query = "INSERT INTO contact (Name, Email, Message) VALUES (?, ?, ?)";
    pool.query(query, [name, email, message], (error, results) => {
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
app.get("/admin/skills", (req, res) => {
  const query = "SELECT * FROM Skill";
    pool.query(query, (error, results) => {
    if (error) {
      console.error("Failed to fetch skills:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

//////////////////////////////////////////////////adding new skill
app.put("/admin/skills/:id", (req, res) => {
  const skillId = req.params.id;
  const { experience } = req.body;

  const query = "UPDATE Skill SET Experience = ? WHERE id = ?";
  pool.query(query, [experience, skillId], (error, results) => {
    if (error) {
      console.error("Failed to update experience:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "Experience updated successfully" });
  });
});

app.post("/admin/skills", (req, res) => {
  const { name, experience } = req.body;

  const query = "INSERT INTO Skill (Name, Experience) VALUES (?, ?)";
  pool.query(query, [name, experience], (error, results) => {
    if (error) {
      console.error("Failed to add skill:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "Skill added successfully" });
  });
});

app.delete("/admin/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const query = "DELETE FROM contact WHERE id = ?";
  pool.query(query, [messageId], (error, results) => {
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
  pool.query(query, [mail, password], (error, results) => {
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
  const query = "SELECT * FROM contact";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Failed to fetch messages from the database:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

/**
 * Normalize a port into a number, string, or undefined.
 *
 * @param {*} value
 * @return {*}
 */
const normalizePort = (value) => {
  const port = parseInt(value, 10)

  if (isNaN(port)) {
    // named pipe
    return value
  }

  if (port >= 0) {
    // port number
    return port
  }

  return undefined
}

/**
 * Event listener for HTTP server 'error' event.
 *
 * @param {NodeJS.ErrnoException} error
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(new Error(`${bind} requires elevated privileges`))

      process.exit(1)

    case 'EADDRINUSE':
      console.error(new Error(`${bind} is already in use`))

      process.exit(1)

    default:
      throw error
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  console.info(`Listening on ${addr.address} ${bind}`)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server')

  server.close(() => {
    console.info('HTTP server closed')
  })
})

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', error => {
  console.error(error)

  setImmediate(() => {
    process.exit(1)
  })
})

// Get port from environment and store in Express.
const port = process.env.PORT || 3000;

// Create HTTP server.
const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

server.listen(port);