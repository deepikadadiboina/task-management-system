const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// DB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// routes
app.use("/api/tasks", require("./routes/taskroutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
