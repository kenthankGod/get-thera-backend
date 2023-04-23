const { Router } = require("express");
const bookingsController = require("../controller/bookingsController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = Router();

router.post("/api/addBookings", protectedRoute, bookingsController.setBooking);
router.get("/api/allBookings", protectedRoute, bookingsController.getBookings);

router.delete(
  "/api/deleteBooking/:id",
  protectedRoute,
  bookingsController.deleteBooking
);

router.get(
  "/hello",
  bookingsController.helloGet
);

module.exports = router;
