module.exports =  (sequelize, Sequelize) => {
    var obj = {}
    obj["id"] =  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
    obj["createdAt"]  = { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    obj["updatedAt"]  = { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    obj["originalData"]  = { type: Sequelize.STRING, allowNull: true, defaultValue: Sequelize.NOW }
    obj["charOrder"]  = { type: Sequelize.JSON, allowNull: true, defaultValue: Sequelize.NOW }
    const Python = sequelize.define('pythons', obj);
    return Python;   
}