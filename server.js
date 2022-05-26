require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/error");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/users"));
app.use("/api/secret", require("./routes/secret"));



// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

//

//Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));