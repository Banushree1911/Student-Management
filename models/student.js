'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
  }, {});
  
  Student.associate = function(models) {
    Student.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department',
    });
  };
  
  return Student;
};
