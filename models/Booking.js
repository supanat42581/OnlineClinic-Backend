module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking",{
        date:{
            allowNull:false,
            type: DataTypes.DATE
        },status:{
            allowNull:true, defaultValue: "AVAILABLE" ,
            type: DataTypes.ENUM("AVAILABLE","PENDING","SUCCESS")
        }
    },
    {
        tableName: "Booking"
    })
    Booking.associate = models =>{
        Booking.belongsTo(models.Doctor, {foreignKey: "doctor_id"})
    }


    return Booking;
}