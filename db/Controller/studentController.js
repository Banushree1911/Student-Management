const { Student, Department } = require('../models');

exports.listStudents = async (req, res) => {
  try {
    const query = req.query.query || '';
    const students = await Student.findAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.like]: `%${query}%` } },
          { registrationNumber: { [Sequelize.Op.like]: `%${query}%` } }
        ]
      },
      include: ['department'],
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, registrationNumber, departmentName } = req.body;
    const department = await Department.findOne({ where: { name: departmentName } });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const student = await Student.create({
      name,
      registrationNumber,
      departmentId: department.id,
    });

    res.status(201).json(student);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Registration number already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.getStudentsByDepartment = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await Department.findByPk(departmentId, {
      include: ['students'],
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json(department.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
