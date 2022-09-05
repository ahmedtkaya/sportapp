const Class = require("../models/Class");
const User = require("../models/User");

exports.createClass = async (req, res) => {
  try {
    const clas = await Class.create(req.body);
    //coach/classes yap
    res.status(200).res.redirect("/classes");
    req.flash("success", `${clas.title} has been created`);
  } catch (error) {
    req.flash("error", `Something went wrong`);
    res.status(404).redirect("/classes");
  }
};

exports.getAllClass = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).render("classes", {
      classes,
      page_name: "classes",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
