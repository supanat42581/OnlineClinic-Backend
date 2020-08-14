module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor",{
        name: DataTypes.STRING(200), 
        education:{
            allowNull:false,
            type: DataTypes.STRING
        },image_url:{
            allowNull: true,
            type: DataTypes.STRING(1200)
        }
    },
    {
        tableName: "Doctor"
    })

    Doctor.associate = models =>{
        Doctor.hasMany(models.Course, {foreignKey: "doctor_id"})
        Doctor.belongsToMany(models.Course, {through:models.Booking, foreignKey: "doctor_id"})
        Doctor.belongsToMany(models.User, {through:models.Booking, foreignKey: "doctor_id"})



    }

    return Doctor;
}