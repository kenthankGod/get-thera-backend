const { Router } = require("express");
const authController = require("../controller/authController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = Router();

router.post("/api/signup", authController.signup_post);

router.post("/api/login", authController.login_post);

router.get("/api/therapistBooking", protectedRoute, authController. therapistBooking_get);

module.exports = router;     