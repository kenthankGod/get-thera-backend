const express = require("express");
const app = express();
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
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
app.use(bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} you better catch it lol`);
});
    

// how can i build a booking website with react and node where
//  the bookings are stored in the backend with mongo db, the bookings
//   contain date, time, name of therapist, and amount, these are forms from the frontend but i want 
// them saved in a mongoDB how will the backend and frontend code look like