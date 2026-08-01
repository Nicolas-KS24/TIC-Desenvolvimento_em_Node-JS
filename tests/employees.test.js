const express = require('express');
const request = require('supertest');
const { Employee } = require('../models');
const employeeRouter = require('../routes/employee.routes');

const app = express();
app.use(express.json());
app.use("/employees", employeeRouter);

jest.mock("../models");
jest.mock("../middleware/middleware", () => ({
    middleware: (req, res, next) => next()
}));
afterEach(() => {
    jest.clearAllMocks();
});

describe("API employees Routes", () => {
    describe("GET employees", () => {
        it("should return 200 for all employees", async () => {
            Employee.findAll.mockResolvedValue([
                { id: 1, name: "alex", positionId: 2 },
                { id: 2, name: "Lucas", positionId: 1 },
                { id: 3, name: "Camila", positionId: 2 }

            ]);
            const response = await request(app).get("/employees");
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([
                { id: 1, name: "alex", positionId: 2 },
                { id: 2, name: "Lucas", positionId: 1 },
                { id: 3, name: "Camila", positionId: 2 }
            ]);
        });

        it("should return 500 if an error occurs", async () => {
            Employee.findAll.mockRejectedValue(new Error("Db error"));
            const response = await request(app).get("/employees");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("GET-BY-ID employees", () => {
        it("should return 200 an employee by id", async () => {
            Employee.findByPk.mockResolvedValue({ id: 1, name: "alex", positionId: 2 });
            const response = await request(app).get("/employees/1");
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ id: 1, name: "alex", positionId: 2 });
        });

        it("should return 404 if employee is not found", async () => {
            Employee.findByPk.mockResolvedValue(null);
            const response = await request(app).get("/employees/999");
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Employee not found." });
        });

        it("should return 500 if an error occurs", async () => {
            Employee.findByPk.mockRejectedValue(new Error("DB error"));
            const response = await request(app).get("/employees/1");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("POST employees", () => {
        it("should return 201 for a newly created position", async () => {
            Employee.create.mockResolvedValue({});
            const response = await request(app).post("/employees").send({ name: "Ana", hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(201);
        });

        it("should return 400 if name is missing", async () => {
            const response = await request(app).post("/employees").send({ hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(Employee.create).not.toHaveBeenCalled();
        });

        it("should return 400 if hireDate is missing", async () => {
            const response = await request(app).post("/employees").send({ name: "Ana", positionId: 1 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(Employee.create).not.toHaveBeenCalled();
        });

        it("should return 400 if positionId is missing", async () => {
            const response = await request(app).post("/employees").send({ name: "Ana", hireDate: new Date() });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(Employee.create).not.toHaveBeenCalled();
        });

        it("should return 500 if an error occurs while creating", async () => {
            Employee.create.mockRejectedValue(new Error("DB errorr"));
            const response = await request(app).post("/employees").send({ name: "Ana", hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("UPDATE employees", () => {
        it("should return 200 while update an employee", async () => {
            const hireDate = new Date();

            const employeeMock = { id: 1, name: "Alex", positionId: 2, update: jest.fn().mockResolvedValue(true) };
            Employee.findByPk.mockResolvedValue(employeeMock);

            const response = await request(app).put("/employees/1").send({ name: "Alex Pinto", hireDate, positionId: 1 });
            expect(response.statusCode).toEqual(200);
            expect(employeeMock.update).toHaveBeenCalledWith({ name: "Alex Pinto", hireDate: hireDate.toISOString(), positionId: 1 });
        });

        it("should return 400 if name is missing", async () => {
            const employeeMock = { id: 1, name: "Alex", positionId: 2, update: jest.fn().mockResolvedValue(true) };
            Employee.findByPk.mockResolvedValue(employeeMock);

            const response = await request(app).put("/employees/1").send({ hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(employeeMock.update).not.toHaveBeenCalled();
        });

        it("should return 400 if hireDate is missing", async () => {
            const employeeMock = { id: 1, name: "Alex", positionId: 2, update: jest.fn().mockResolvedValue(true) };
            Employee.findByPk.mockResolvedValue(employeeMock);

            const response = await request(app).put("/employees/1").send({ name: "Alex", positionId: 1 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(employeeMock.update).not.toHaveBeenCalled();
        });

        it("should return 400 if positionId is missing", async () => {
            const employeeMock = { id: 1, name: "Alex", positionId: 2, update: jest.fn().mockResolvedValue(true) };
            Employee.findByPk.mockResolvedValue(employeeMock);

            const response = await request(app).put("/employees/1").send({ name: "Alex", hireDate: new Date() });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name, hireDate and positionId are required." });
            expect(employeeMock.update).not.toHaveBeenCalled();
        });

        it("should return 404 if employee to update is not found", async () => {
            Employee.findByPk.mockResolvedValue(null);
            const response = await request(app).put("/employees/999").send({ name: "Ana", hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Employee not found." });
        });

        it("should return 500 if an error occurs while updating", async () => {
            const employeeMock = { id: 1, name: "Alex", positionId: 2, update: jest.fn().mockRejectedValue(new Error("DB error")) };
            Employee.findByPk.mockResolvedValue(employeeMock);
            const response = await request(app).put("/employees/1").send({ name: "Alex Pinto", hireDate: new Date(), positionId: 1 });
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("DELETE employees", () => {
        it("should return 200 while delete an employee", async () => {
            const employeeMock = {
                destroy: jest.fn().mockResolvedValue(true)
            };

            Employee.findByPk.mockResolvedValue(employeeMock);
            const response = await request(app).delete("/employees/1");
            expect(response.statusCode).toEqual(204);
            expect(employeeMock.destroy).toHaveBeenCalledWith();
        });

        it("should return 404 if employee to delete is not found", async () => {
            Employee.findByPk.mockResolvedValue(null);
            const response = await request(app).delete("/employees/999");
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Employee not found." });
        });

        it("should return 500 if an error occurs while deleting", async () => {
            const employeeMock = { destroy: jest.fn().mockRejectedValue(new Error("DB error")) };
            Employee.findByPk.mockResolvedValue(employeeMock);
            const response = await request(app).delete("/employees/1");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });
});
