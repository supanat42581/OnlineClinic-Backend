const express = require("express");
const router = express.Router();
const controllers = require("../controllers/doctor");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });



router.post("/", auth, controllers.createDoctor)
router.get("/:id", auth, controllers.getDoctor)


module.exports = router;