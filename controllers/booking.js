const db = require("../models");

const userGetBooking = async (req, res, next) => {

    try {
        const allCourses = await db.Booking.findAll({ where: { user_id: req.user.id } });
    res.status(200).send(allCourses)
    
    } catch (err) {
        next(err)
    }

};


const doctorGetBooking = async (req, res, next) => {
    const doctorId = req.params.id;
    try {
        const allCourses = await db.Booking.findAll({ where: { doctor_id: doctorId } });
    res.status(200).send(allCourses)
    
    } catch (err) {
        next(err)
    }

};


const createBooking = async (req, res) => {
    const { date, status,user_id, course_id, doctor_id, bookingId } = req.body;
try{
    console.log(req.body
        )
    const booking = await db.Booking.create({
        date,
        status,
        user_id:req.user.id, 
        course_id,
        doctor_id,
        bookingId 
    });

    res.status(201).send(booking);}
    catch (err){
        console.log("error",err.message)
    }
};

const updatePendingBooking = async (req, res) => {
    const {course_id} = req.body
    const bookingId = req.params.id;
    const targetbooking = await db.Booking.findOne({ where: { user_id: bookingId, course_id, } });

    if (targetbooking) {
        await db.Booking.update({status: "PENDING"},{ where: { user_id: bookingId, course_id, }});
        res.status(200).send({ message: `Booking ID:${bookingId} is pending.` });
    } else {
        res.status(404).send({ message: `Booking ID: ${bookingId} Not Found` });
    }

};

const updateSuccessBooking = async (req, res) => {
    const {course_id} = req.body
    const bookingId = req.params.id;
    const targetbooking = await db.Booking.findOne({ where: { user_id: bookingId, course_id, } });

    if (targetbooking) {
        await db.Booking.update({status: "SUCCESS"},{ where: { user_id: bookingId, course_id, }});
        res.status(200).send({ message: `Booking ID:${bookingId} is success.` });
    } else {
        res.status(404).send({ message: `Booking ID: ${bookingId} Not Found` });
    }

};

const cancelBooking = async (req, res) => {
    const {course_id} = req.body
    const bookingId = req.params.id;
    const targetbooking = await db.Booking.findOne({ where: { user_id: bookingId, course_id, } });

    if (targetbooking) {
        await targetbooking.destroy();
        res.status(204).send({ message: `Booking ID:${bookingId} is cancel.` });
    } else {
        res.status(404).send({ message: `Booking ID: ${bookingId} Not Found` });
    }

};

module.exports = {
    userGetBooking,
    createBooking,
    updatePendingBooking,
    updateSuccessBooking,
    doctorGetBooking,
    cancelBooking
}


