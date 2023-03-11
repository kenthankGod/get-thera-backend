const express = require("express");
const app = express();
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const corsOptions = require("./config/corsOption");
require("dotenv").config({ path: "./config/.env" });

// DB CONNECTION
connectDB();

// PORT
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(bodyParser.json());

// CORS
app.use(cors(corsOptions));

// ROUTE
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} you better catch it lol`);
});
    