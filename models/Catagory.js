module.exports = (sequelize, DataTypes) => {
    const Catagory = sequelize.define("Catagory",{
        name: DataTypes.STRING(200), 
    },
    {
        tableName: "Catagory"
    })

    Catagory.associate = models =>{
        Catagory.hasMany(models.Course, {foreignKey: "catagory_id"})
    }

    return Catagory;
}