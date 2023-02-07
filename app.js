//external file input
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal file input
const {
  notFoundHandaller,
  errorHandaller,
} = require("./middlewares/common/errorhandaller");

const app = express();
dotenv.config();

const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

//mongoose Connection

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGOSE_CONNECT)
  .then(() => console.log("Connection Successfully"))
  .catch((err) => console.log(err));

// request  parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine set
app.set("view engine", "ejs");

//static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.SECRET_KEY));

//routing setup

app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

//404 error handalling
app.use(notFoundHandaller);

// defult error handalling
app.use(errorHandaller);

app.listen(process.env.PORT, () => {
  console.log(`listing on port ${process.env.PORT}`);
});
