module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        name: DataTypes.STRING(200), 
        username: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING 
        },
        password:{
            allowNull:false,
            type: DataTypes.STRING
        },email:{
            unique: true,
            allowNull:false,
            type: DataTypes.STRING
        },tel:{
            allowNull:false,
            type: DataTypes.STRING
        },sex:{
            allowNull:false,
            type: DataTypes.ENUM("Male","Female")
        },birthdate:{
            allowNull:false,
            type: DataTypes.DATEONLY
        },role:{
            allowNull:false,
            type: DataTypes.ENUM("Patient")
        },image_url: {
            allowNull: true,
            type: DataTypes.STRING(200)
        }

    },
    {
        tableName: "User"
    })

    User.associate = models =>{
        User.belongsToMany(models.Course, {through:models.Booking, foreignKey: "user_id"})
        User.belongsToMany(models.Doctor, {through:models.Booking, foreignKey: "user_id"})
    }

    return User;
}