const express = require("express");
const router = express.Router();
const controllers = require("../controllers/doctor");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });



router.post("/", auth, controllers.createDoctor)


module.exports = router;