const db = require("../models");
const { Op } = require("sequelize");


const getAllCourses = async (req, res, next) => {
    try {
        const allCourses = await db.Course.findAll();
    res.status(200).send(allCourses)
    
    } catch (err) {
        next(err)
    }
 
};


const getCourseById = async (req, res) => {
    const targetCourseId = req.params.id;
    const targetCourse = await db.Course.findOne({ where: { id:targetCourseId }});

    if (targetCourse) {
        res.status(200).send(targetCourse);
    } else {
        res.status(404).send({ message: `Course ID: ${targetcourseId} Not Found` });
    }

};


const getCourseByCatagory = async (req,res) => {
    try {
    const courseInCatagory = await db.Course.findAll({where: {catagory_id: catagory_id}})
    res.status(200).send(courseInCatagory)
    
    } catch (err) {
        next(err)
    }
};



// const getCourseById = async (req, res) => {
//     const targetCourseId = req.params.id;
//     const targetCourse = await db.Course.findOne({ where: { targetCourseId:{[Op.Like]: "%brain"}} });
//     if (targetCourse) {
//         res.status(200).send(targetCourse);
//     } else {
//         res.status(404).send({ message: `Course ID: ${targetcourseId} Not Found` });
//     }

// };

const createCourse = async (req, res) => {
    const { name, price, catagory } = req.body;

    const newCourse = await db.Course.create({
        name,
        price,
        catagory
    });

    res.status(201).send(newCourse);
};


module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    getCourseByCatagory
}
 