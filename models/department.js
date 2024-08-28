'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  
  Department.associate = function(models) {
    Department.hasMany(models.Student, {
      foreignKey: 'departmentId',
      as: 'students',
    });
  };
  
  return Department;
};
