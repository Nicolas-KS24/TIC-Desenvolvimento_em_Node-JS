const express = require('express');
const request = require('supertest');
const { Position } = require('../models');
const positionRouter = require('../routes/position.routes');
const { middleware } = require('../middleware/middleware');

const app = express();
app.use(express.json());
app.use("/positions", positionRouter);

jest.mock("../models");
jest.mock("../middleware/middleware", () => ({
    middleware: (req, res, next) => next()
}));
afterEach(() => {
    jest.clearAllMocks();
});

describe("API Positions Routes", () => {
    describe("GET Positions", () => {
        it("should return 200 for all positions", async () => {
            Position.findAll.mockResolvedValue([
                { id: 2, title: "Developer", salary: 30000 },
                { id: 1, title: "Manager", salary: 80000 }
            ]);
            const response = await request(app).get("/positions");
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([
                { id: 2, title: "Developer", salary: 30000 },
                { id: 1, title: "Manager", salary: 80000 }
            ]);
        });

        it("should return 500 if an error occurs", async () => {
            Position.findAll.mockRejectedValue(new Error("DB error"));
            const response = await request(app).get("/positions");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("GET-BY-ID positions", () => {
        it("should return 200 while an position by id", async () => {
            Position.findByPk.mockResolvedValue({ id: 1, title: "Manager", salary: 80000 });
            const response = await request(app).get("/positions/1");
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ id: 1, title: "Manager", salary: 80000 });
        });

        it("should return 404 if position is not found", async () => {
            Position.findByPk.mockResolvedValue(null);
            const response = await request(app).get("/positions/999");
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Position not found." });
        });

        it("should return 500 if an occurs", async () => {
            Position.findByPk.mockRejectedValue(new Error("DB error"));
            const response = await request(app).get("/positions/1");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("POST positions", () => {
        it("should return 201 for a newly created position", async () => {
            Position.create.mockResolvedValue({});
            const response = await request(app).post("/positions").send({ title: "Finance", salary: 50000 });
            expect(response.statusCode).toEqual(201);
        });

        it("should return 400 if title is missing", async () => {
            const response = await request(app).post("/positions").send({ salary: 50000 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Title and salary are required." });
            expect(Position.create).not.toHaveBeenCalled();
        });

        it("should return 400 if salary is missing", async () => {
            const response = await request(app).post("/positions").send({ title: "Finance" });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Title and salary are required." });
            expect(Position.create).not.toHaveBeenCalled();
        });

        it("should return 500 if an occurs while creating", async () => {
            Position.create.mockRejectedValue(new Error("DB error"));
            const response = await request(app).post("/positions").send({ title: "Finance", salary: 50000 });
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("UPDATE positions", () => {
        it("should return 200 while update an position", async () => {
            const positionMock = { id: 1, title: "Manager", salary: 80000, update: jest.fn().mockResolvedValue(true) };
            Position.findByPk.mockResolvedValue(positionMock);

            const response = await request(app).put("/positions/1").send({ title: "Developer", salary: 60000 });
            expect(response.statusCode).toEqual(200);
            expect(positionMock.update).toHaveBeenCalledWith({ title: "Developer", salary: 60000 });
        });

        it("should return 400 if title is missing", async () => {
            const positionMock = { id: 1, title: "Manager", salary: 80000, update: jest.fn().mockResolvedValue(true) };
            Position.findByPk.mockResolvedValue(positionMock);

            const response = await request(app).put("/positions/1").send({ salary: 60000 });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Title and salary are required." });
            expect(positionMock.update).not.toHaveBeenCalled();
        });

        it("should return 400 if salary is missing", async () => {
            const positionMock = { id: 1, title: "Manager", salary: 80000, update: jest.fn().mockResolvedValue(true) };
            Position.findByPk.mockResolvedValue(positionMock);

            const response = await request(app).put("/positions/1").send({ title: "Developer" });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Title and salary are required." });
            expect(positionMock.update).not.toHaveBeenCalled();
        });

        it("should return 404 if position not found", async () => {
            Position.findByPk.mockResolvedValue(null);
            const response = await request(app).put("/positions/999").send({ title: "Finance", salary: 60000 });
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Position not found." });
        });

        it("should return 500 if an error occurs while updating", async () => {
            const positionMock = { id: 1, title: "Manager", salary: 80000, update: jest.fn().mockRejectedValue(new Error("DB error")) };
            Position.findByPk.mockResolvedValue(positionMock);
            const response = await request(app).put("/positions/1").send({ title: "Developer", salary: 60000 });
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("DELETE positions", () => {
        it("should return while delete an position", async () => {
            const positionMock = {
                destroy: jest.fn().mockResolvedValue(true)
            };

            Position.findByPk.mockResolvedValue(positionMock);
            const response = await request(app).delete("/positions/1");
            expect(response.statusCode).toEqual(204);
            expect(positionMock.destroy).toHaveBeenCalledWith();
        });

        it("should return 404 if positon not found", async () => {
            Position.findByPk.mockResolvedValue(null);
            const response = await request(app).delete("/positions/999");
            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual({ error: "Position not found." });
        });

        it("should return 500 if an error occurs while deleting", async () => {
            const positionMock = { destroy: jest.fn().mockRejectedValue(new Error("DB error")) };
            Position.findByPk.mockResolvedValue(positionMock);
            const response = await request(app).delete("/positions/1");
            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });
});