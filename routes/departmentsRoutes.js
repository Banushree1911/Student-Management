const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.listDepartments);
router.post('/', departmentController.createDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
