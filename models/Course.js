module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course",{
        name: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING 
        },
        price:{
            allowNull:false,
            type: DataTypes.STRING
        },
        catagory:{
            allowNull:false,
            type: DataTypes.STRING
        },
    },
    {
        tableName: "Course",
    })

    Course.associate = models =>{
        Course.belongsToMany(models.User, {through:models.Booking, foreignKey: "course_id"})
        Course.belongsTo(models.Doctor, {foreignKey: "doctor_id"})
        Course.belongsTo(models.Catagory, {foreignKey: "catagory_id"})
    }

    return Course;
}