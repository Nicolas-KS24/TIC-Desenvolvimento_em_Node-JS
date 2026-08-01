const {User} = require("../models");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");
const { sign } = require("jsonwebtoken");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
        this.statusCode = 401;
    }
}

class ConflictError extends Error{
    constructor(message){
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409;
    }
}

module.exports = {
    async login(req, res) {
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                throw new ValidationError("Name and password are required.");
            }
            const user = await User.findOne({ where: { name } });

            if (!user) {
                throw new AuthError("Invalid credentials.");
            }
            const passwordMatches = bcrypt.compareSync(password, user.password);

            if (!passwordMatches) {
                throw new AuthError("Invalid credentials.");
            }

            const token = auth.generateToken(user.name);
            return res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            if (err instanceof ValidationError || err instanceof AuthError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async createUser(req, res) {
        try {
            const { name, password } = req.body;
            if (!name || !password) {
                throw new ValidationError("Name and password are required.");
                
            }
            const existingUser = await User.findOne({where: {name}});
            if(existingUser){
                throw new ConflictError("User already exists.");
            }

            const passwordhash = bcrypt.hashSync(password, 8);
            const user = await User.create({name, password: passwordhash });

            const token = auth.generateToken(user.name);
            return res.status(201).json({ token });
        } catch (err) {
            console.error(err);
            if (err instanceof ValidationError || err instanceof AuthError || err instanceof ConflictError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            res.status(500).json({ message: "Error 500 server." });
        }
    }
};