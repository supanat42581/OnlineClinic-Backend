const express = require("express");
const router = express.Router();
const controllers = require("../controllers/booking");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });


router.post("/", auth, controllers.createBooking);
router.get("/", auth, controllers.userGetBooking);
router.get("/doctor/:id", auth, controllers.doctorGetBooking);
router.patch("/pending/:id", auth, controllers.updatePendingBooking);
router.patch("/success/:id", auth, controllers.updateSuccessBooking);
router.delete("/:doctor_id/:course_id", auth, controllers.cancelBooking);
module.exports = router;