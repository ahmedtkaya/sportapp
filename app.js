const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const Class = require("./models/Class");
const User = require("./models/User");
const pageRoute = require("./routes/pageRoute");
const classRoute = require("./routes/classRoute");
const userRoute = require("./routes/userRoute");
const classController = require("./controllers/classController");

const app = express();

mongoose
  .connect("mongodb://localhost/yoga-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  });

//template engine
app.set("view engine", "ejs");

global.userIN = null;

//Middleware

app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "my_keyboard_cat", // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/yoga-db" }),
  })
);
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use("/", pageRoute);
app.use("/classes", classRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Connect on ${port} port`);
});
