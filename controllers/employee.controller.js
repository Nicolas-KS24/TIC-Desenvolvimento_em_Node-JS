const { Employee } = require('../models');

module.exports = {
    async getEmployee(req, res) {
        try {
            const employee = await Employee.findAll();
            return res.json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async getEmployeeById(req, res) {
        try {
            const { id } = req.params;
            const employee = await Employee.findByPk(id);

            if (!employee) {
                return res.status(404).json({ error: "Employee not found." });
            }
            return res.json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async createEmployee(req, res) {
        try {
            const { name, hireDate, positionId } = req.body;
            if(!name || !hireDate || !positionId){
                return res.status(400).json({error: "Name, hireDate and positionId are required."});
            }

            const employee = await Employee.create({ name, hireDate, positionId });

            return res.status(201).json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async updateEmployee(req, res) {
        try {
            const { id } = req.params;
            const employee = await Employee.findByPk(id);

            if (!employee) {
                return res.status(404).json({ error: "Employee not found." });
            }

            const { name, hireDate, positionId } = req.body;
            if(!name || !hireDate || !positionId){
                return res.status(400).json({error: "Name, hireDate and positionId are required."});
            }

            await employee.update({ name, hireDate, positionId });
            return res.json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async deleteEmployee(req, res) {
        try {
            const { id } = req.params;
            const employee = await Employee.findByPk(id);

            if (!employee) {
                return res.status(404).json({ error: "Employee not found." });
            }

            await employee.destroy();
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },
};