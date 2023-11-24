const express = require("express");
// Enable CORS for all routes
const cors = require('cors');

const app = express();
const connectDB = require("./config/db");
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Runn"));

app.use("/api/users", require("./routes/api/users"));

// app.use("/api/posts", require("./routes/api/posts"));

// app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// (base) PS C:\Files\Learn\MERN_S> git add .
// warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it
// warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
