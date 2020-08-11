const express = require("express");
const router = express.Router();
const controllers = require("../controllers/course");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });


router.get("/", auth, controllers.getAllCourses);
router.get("/search", auth, controllers.getCourseBySearch);
router.get("/:catagory", auth, controllers.getCourseByCatagory)
router.post("/", auth, controllers.createCourse)



module.exports = router;