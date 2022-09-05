const pageControllers = require("../controllers/pageControllers");
const express = require("express");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router.route("/").get(pageControllers.getIndexPage);
router.route("/about").get(pageControllers.getAboutPage);
router.route("/contact").get(pageControllers.getContactPage);
router.route("/add").get(pageControllers.getAddPage);
router.route("/register").get(pageControllers.getRegisterPage);
router.route("/login").get(pageControllers.getLoginPage);
module.exports = router;
