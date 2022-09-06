const express = require("express");
const classController = require("../controllers/classController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();
//MİDDLEWARE EKLE SONRA
router.route("/").post(roleMiddleware(["coach"]), classController.createClass);
router.route("/").get(classController.getAllClass);
router.route("/:slug").get(classController.getClass);
module.exports = router;
