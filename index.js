require("dotenv").config();
require('./config/passport')

const express = require('express')
const app = express();
const db = require('./models')

const fileUpload = require('express-fileupload')
const userRoutes = require('./routes/user')
const bookingRoutes = require('./routes/booking')
const catagoryRoutes = require('./routes/catagory')
const courseRoutes = require('./routes/course')
const doctorRoutes = require('./routes/doctor')

const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static('./images'));
app.use(cors())

app.use("/user", userRoutes);
app.use("/booking", bookingRoutes)
app.use("/catagory", catagoryRoutes)
app.use("/course", courseRoutes)
app.use("/doctor", doctorRoutes)


db.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });

});