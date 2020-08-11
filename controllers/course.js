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


const getCourseByCatagory = async (req,res) => {
    try {
    const categoryId = req.params.catagory
    const courseInCatagory = await db.Course.findAll({where: {catagory_id:categoryId}})
    res.status(200).send(courseInCatagory)
    
    } catch (err) {
        next(err)
    }
};



const getCourseBySearch = async (req, res) => {
    const targetCourseName = req.query.name;
    const targetCourse = await db.Course.findAll({ where: { name: {[Op.like]: `%${targetCourseName}%` } } });
    if (targetCourse) {
        res.status(200).send(targetCourse);
    } else {
        res.status(404).send({ message: `Course Name: ${targetCourse} Not Found` });
    }
};


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
    createCourse,
    getCourseByCatagory,
    getCourseBySearch
}
 