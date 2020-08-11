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


module.exports = {
    createDoctor,
}