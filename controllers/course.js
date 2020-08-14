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
    console.log(targetCourse)
    if (targetCourse) {
        res.status(200).send(targetCourse);
    } else {
        res.status(404).send({ message: `Course Name: ${targetCourse} Not Found` });
    }
};



// const getCourseBySearch = async (req, res) => {
//     const {name, category} = req.query
//     const whereProductName = {}
//     if (name) {
//         whereProductName.name = {[Op.like] : `%${name}%`}
//     }
//     const whereObj = {where: {...whereProductName}};
//     const productAll = await db.Product.findAll(whereObj)
//     res.status(200).send(productAll)
// }


const createCourse = async (req, res) => {
    const { name, price, catagory,doctor_id, image_url } = req.body;
try {
    const newCourse = await db.Course.create({
        name,
        price,
        catagory,
        doctor_id,
        image_url
    });

    res.status(201).send(newCourse);
} catch (err){
    console.log(err)
    res.send(err)
}
    

    
};


module.exports = {
    getAllCourses,
    createCourse,
    getCourseByCatagory,
    getCourseBySearch
}
 