const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

const port = 3030;

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

// Only runs on incoming requests with the path of /dogs
// https://expressjs.com/en/4x/api.html#app.use
app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  throw new AppError("password required", 401);
  // res.send("SORRY YOU NEED A PASSWORD!!");
  // throw new Error("Password required!", 400);
};

// app.use((req, res, next) => {
//   console.log("THIS IS MY FIRST MIDDLEWARE!");
//   return next();
//   console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()");
// });

// app.use((req, res, next) => {
//   console.log("THIS IS MY SECOND MIDDLEWARE!");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("THIS IS MY THIRD MIDDLEWARE!");
//   return next();
// });

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("WOOF WOOF!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "MY SECRET IS: Sometimes I wear headphones in public so I don't have to talk to anyone."
  );
});

app.get("/admin", (req, res) => {
  throw new AppError("You are not an Admin!", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

// app.use((err, req, res, next) => {
//   console.log("*******************************************");
//   console.log("****************** ERROR ******************");
//   console.log("*******************************************");
//   console.log(err);
//   // next();
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Weng Wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}...`);
});
