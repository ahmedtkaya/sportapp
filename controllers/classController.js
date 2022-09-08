const Class = require("../models/Class");
const User = require("../models/User");

exports.createClass = async (req, res) => {
  try {
    const clas = await Class.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      user: req.session.userID,
    });
    //coach/classes yap
    res.status(200).redirect("/add");
    req.flash("success", `${clas.name} has been created`);
  } catch (error) {
    req.flash("error", `Something went wrong`);
    res.status(404).redirect("/add");
  }
};

exports.getAllClass = async (req, res) => {
  try {
    const classes = await Class.find().sort("-createdAt").populate("user");
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

exports.getClass = async (req, res) => {
  try {
    const onlyclass = await Class.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const user = await User.findById(req.session.userID);

    res.status(200).render("yoga", {
      onlyclass,
      user,
      page_name: "yoga",
    });
  } catch (error) {}
};

exports.deleteClass = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const clas = await Class.findOneAndRemove({ slug: req.params.slug });
    req.flash("success", `${clas.name} has been removed from ${user.name}`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
