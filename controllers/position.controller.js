const { Position } = require('../models');

module.exports = {
    async getPosition(req, res) {
        try {
            const position = await Position.findAll();
            return res.json(position);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async getPositionById(req, res) {
        try {
            const { id } = req.params;
            const position = await Position.findByPk(id);

            if (!position) {
                return res.status(404).json({ error: "Position not found." });
            }
            return res.json(position);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async createPosition(req, res) {
        try {
            const { title, salary } = req.body;
            if(!title || salary === undefined || salary === null){
                return res.status(400).json({error: "Title and salary are required."});
            }

            const position = await Position.create({ title, salary });

            return res.status(201).json(position);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async updatePosition(req, res) {
        try {
            const { id } = req.params;
            const position = await Position.findByPk(id);

            if (!position) {
                return res.status(404).json({ error: "Position not found." });
            }

            const { title, salary } = req.body;
            if(!title || salary === undefined || salary === null){
                return res.status(400).json({error: "Title and salary are required."});
            }

            await position.update({ title, salary });
            return res.json(position);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },

    async deletePosition(req, res) {
        try {
            const { id } = req.params;
            const position = await Position.findByPk(id);

            if (!position) {
                return res.status(404).json({ error: "Position not found." });
            }
            await position.destroy();
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error 500 server." });
        }
    },
};