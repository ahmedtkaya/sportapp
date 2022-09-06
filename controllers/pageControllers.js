const User = require("../models/User");
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};
/*
exports.getClassesPage = (req, res) => {
  res.status(200).render("classes", {
    page_name: "classes",
  });
};*/
exports.getAddPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "classes" //add sayfasında userı yakalamak için bunu yazdık
  );
  res.status(200).render("add", {
    page_name: "add",
    user,
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
