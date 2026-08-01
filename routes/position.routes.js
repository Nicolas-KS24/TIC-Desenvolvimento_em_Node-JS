const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position.controller');
const {middleware} = require('../middleware/middleware');

router.get("/", middleware, positionController.getPosition);
router.get("/:id", middleware, positionController.getPositionById);
router.post("/", middleware, positionController.createPosition);
router.put("/:id", middleware, positionController.updatePosition);
router.delete("/:id", middleware, positionController.deletePosition);

module.exports = router;