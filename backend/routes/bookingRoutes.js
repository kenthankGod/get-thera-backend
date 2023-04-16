const { Router } = require("express");
const bookingsController = require("../controller/bookingsController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = Router();

router.post("/addBookings", protectedRoute, bookingsController.setBooking);
router.get("/allBookings", protectedRoute, bookingsController.getBookings);

router.delete(
  "/deleteBooking/:id",
  protectedRoute,
  bookingsController.deleteBooking
);

module.exports = router;
