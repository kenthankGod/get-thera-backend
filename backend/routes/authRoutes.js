const { Router } = require("express");
const authController = require("../controller/authController");
const { protectedRoute } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", authController.signup_post);

router.post("/login", authController.login_post);

router.get("/therapistBooking", protectedRoute, authController. therapistBooking_get);

module.exports = router;     