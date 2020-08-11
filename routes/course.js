const express = require("express");
const router = express.Router();
const controllers = require("../controllers/course");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });


router.get("/", auth, controllers.getAllCourses);
router.get("/:id", auth, controllers.getCourseById);
router.get("/:catagory", auth, controllers.getCourseByCatagory)
router.post("/", auth, controllers.createCourse)


module.exports = router;