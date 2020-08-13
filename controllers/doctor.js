const db = require('../models')


const createDoctor = async (req, res) => {
    const { name, education, image_url } = req.body;

    const newDoctor = await db.Doctor.create({
        name,
        education,
        image_url
    });

    res.status(201).send(newDoctor);
};

const getDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const allCourses = await db.Doctor.findOne({ where: { id: doctorId} });
    res.status(200).send(allCourses)
    
    } catch (err) {
        next(err)
    }
    // res.send(doctorId)

};


module.exports = {
    createDoctor,
    getDoctor
}