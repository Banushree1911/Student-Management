const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.listStudents);
router.post('/', studentController.createStudent);
router.get('/department/:departmentId', studentController.getStudentsByDepartment);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
