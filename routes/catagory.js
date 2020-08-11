const express = require("express");
const router = express.Router();
const controllers = require("../controllers/catagory");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, controllers.getAllCatagories);
router.post("/", auth, controllers.createCatagory);

module.exports = router;