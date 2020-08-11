const db = require("../models");
const { Op } = require("sequelize");


const getAllCatagories = async (req, res, next) => {
    try {
        const allCatagories = await db.Catagory.findAll();
    res.status(200).send(allCatagories)
    
    } catch (err) {
        next(err)
    }
 
};

const createCatagory = async (req, res, next) => {
    const {name} = req.body;
    try {
        const targetCatagory = await db.Catagory.create({name});
    res.status(200).send(targetCatagory)
    
    } catch (err) {
        next(err)
    }

};

module.exports = {
    getAllCatagories,
    createCatagory

}
 