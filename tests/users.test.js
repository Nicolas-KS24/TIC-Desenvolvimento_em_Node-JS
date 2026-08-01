const express = require('express');
const request = require('supertest');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const auth = require('../utils/auth');
const userRouter = require('../routes/user.routes');

const app = express();
app.use(express.json());
app.use('/users', userRouter);

jest.mock("../models");
jest.mock("bcrypt");
jest.mock("../utils/auth");

afterEach(() => {
    jest.clearAllMocks();
});

describe("API Users Routes", () => {
    describe("POST Users", () => {
        it("should return 200 and a token for valid credentials", async () => {
            User.findOne.mockResolvedValue({ id: 1, name: "Alex", password: "hashed_password" });
            bcrypt.compareSync.mockReturnValue(true);
            auth.generateToken.mockReturnValue("fake.jwt.token");

            const response = await request(app).post("/users/login").send({ name: "Alex", password: "123456" });
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ token: "fake.jwt.token" });
            expect(User.findOne).toHaveBeenCalledWith({ where: { name: "Alex" } });
            expect(bcrypt.compareSync).toHaveBeenCalledWith("123456", "hashed_password");
            expect(auth.generateToken).toHaveBeenCalledWith("Alex");
        });

        it("should return 400 if name is missing", async () => {
            const response = await request(app).post("/users/login").send({ password: "123456" });

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name and password are required." });
            expect(User.findOne).not.toHaveBeenCalled();
        });

        it("should return 400 if password is missing", async () => {
            const response = await request(app).post("/users/login").send({ name: "alex" });

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name and password are required." });
            expect(User.findOne).not.toHaveBeenCalled();
        });

        it("should return 401 if user does not exist", async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app).post("/users/login").send({ name: "ghost", password: "123456" });

            expect(response.statusCode).toEqual(401);
            expect(response.body).toEqual({ error: "Invalid credentials." });
            expect(bcrypt.compareSync).not.toHaveBeenCalled();
        });

        it("should return 401 if password does not match", async () => {
            User.findOne.mockResolvedValue({ id: 1, name: "alex", password: "hashed_password" });
            bcrypt.compareSync.mockReturnValue(false);

            const response = await request(app).post("/users/login").send({ name: "alex", password: "wrong" });

            expect(response.statusCode).toEqual(401);
            expect(response.body).toEqual({ error: "Invalid credentials." });
            expect(auth.generateToken).not.toHaveBeenCalled();
        });

        it("should return 500 if an error occurs", async () => {
            User.findOne.mockRejectedValue(new Error("DB error"));

            const response = await request(app).post("/users/login").send({ name: "alex", password: "123456" });

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });

    describe("POST /users/create-user", () => {
        it("should return 201 and a token for a newly created user", async () => {
            User.findOne.mockResolvedValue(null);
            bcrypt.hashSync.mockReturnValue("hashed_password");
            User.create.mockResolvedValue({ id: 1, name: "Jose", password: "hashed_password" });
            auth.generateToken.mockReturnValue("fake.jwt.token");

            const response = await request(app).post("/users/create-user").send({ name: "Jose", password: "123456" });

            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual({ token: "fake.jwt.token" });
            expect(User.findOne).toHaveBeenCalledWith({ where: { name: "Jose" } });
            expect(bcrypt.hashSync).toHaveBeenCalledWith("123456", 8);
            expect(User.create).toHaveBeenCalledWith({ name: "Jose", password: "hashed_password" });
            expect(auth.generateToken).toHaveBeenCalledWith("Jose");
        });

        it("should return 400 if name is missing", async () => {
            const response = await request(app).post("/users/create-user").send({ password: "123456" });

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name and password are required." });
            expect(User.findOne).not.toHaveBeenCalled();
            expect(User.create).not.toHaveBeenCalled();
        });

        it("should return 400 if password is missing", async () => {
            const response = await request(app).post("/users/create-user").send({ name: "Jose" });

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual({ error: "Name and password are required." });
            expect(User.findOne).not.toHaveBeenCalled();
            expect(User.create).not.toHaveBeenCalled();
        });

        it("should return 409 if user already exists", async () => {
            User.findOne.mockResolvedValue({ id: 1, name: "Jose", password: "hashed_password" });

            const response = await request(app).post("/users/create-user").send({ name: "Jose", password: "123456" });

            expect(response.statusCode).toEqual(409);
            expect(response.body).toEqual({ error: "User already exists." });
            expect(User.create).not.toHaveBeenCalled();
        });

        it("should return 500 if an error occurs while checking existing user", async () => {
            User.findOne.mockRejectedValue(new Error("DB error"));

            const response = await request(app).post("/users/create-user").send({ name: "Jose", password: "123456" });

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });

        it("should return 500 if an error occurs while creating the user", async () => {
            User.findOne.mockResolvedValue(null);
            bcrypt.hashSync.mockReturnValue("hashed_password");
            User.create.mockRejectedValue(new Error("DB error"));

            const response = await request(app).post("/users/create-user").send({ name: "Jose", password: "123456" });

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual({ message: "Error 500 server." });
        });
    });
});