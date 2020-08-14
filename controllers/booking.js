const db = require("../models");

const userGetBooking = async (req, res, next) => {
// const {doctor_id,course_id} = req.params
console.log(req.user.id)
    try {
        const allCourses = await db.Booking.findAll({  include:[ {model: db.Doctor},{model: db.Course} ],where: { user_id: req.user.id} });
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
  
    const {course_id,doctor_id,date} = req.body
 console.log(req.body)

try{

    const booking = await db.Booking.create({
        date,
        status: "PENDING",
        user_id:req.user.id, 
        course_id,
        doctor_id
    });

    res.status(201).send(booking);}
    catch (err){
        console.log("error",err.message)
    }
};

const updatePendingBooking = async (req, res) => {
    const {course_id,doctor_id} = req.body
    const bookingId = req.user.id;
    console.log(course_id, doctor_id,bookingId)
    const targetbooking = await db.Booking.findOne({ where: { user_id: bookingId, course_id,doctor_id } });

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

    const {doctor_id, course_id } = req.params
   
    const targetbooking = await db.Booking.findOne({ where: { user_id: req.user.id, course_id, doctor_id } });
    console.log(targetbooking)

    console.log({ user_id: req.user.id, course_id, doctor_id })
    console.log(req.params)


    if (targetbooking) {
        await targetbooking.destroy();
        res.status(204).send({ message: `Booking ID:${targetbooking} is cancel.` });
    } else {
        res.status(404).send({ message: `Booking ID: ${targetbooking} Not Found` });
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


