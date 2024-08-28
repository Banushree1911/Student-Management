const { Department } = require('../models');

exports.listDepartments = async (req, res) => {
  try {
    const query = req.query.query || '';
    const departments = await Department.findAll({
      where: { name: { [Sequelize.Op.like]: `%${query}%` } },
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Department name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await Department.findByPk(departmentId);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const students = await department.getStudents();
    if (students.length > 0) {
      return res.status(400).json({ error: 'Cannot delete department with students assigned' });
    }

    await department.destroy();
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
