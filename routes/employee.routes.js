const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const {middleware} = require('../middleware/middleware');

router.get('/', middleware, employeeController.getEmployee);
router.get('/:id', middleware, employeeController.getEmployeeById);
router.post('/', middleware, employeeController.createEmployee);
router.put('/:id', middleware, employeeController.updateEmployee);
router.delete('/:id', middleware, employeeController.deleteEmployee);

module.exports = router;