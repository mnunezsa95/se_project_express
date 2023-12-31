require("dotenv").config();
const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const helmet = require("helmet"); // import helmet (security package)
const cors = require("cors"); // import cors
const { errors } = require("celebrate");
const routes = require("./routes"); // import routes
const { limiter } = require("./middlewares/rateLimiter");
const { login, createUser } = require("./controllers/users");
const { errorHandler } = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateUserSignup,
  validateLogin,
} = require("./middlewares/validation");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db"); // connect to mongoDB
const { PORT = 3001 } = process.env; // set PORT default to 3001

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.post("/signup", validateUserSignup, createUser);
app.post("/signin", validateLogin, login);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// set app listen at PORT
app.listen(PORT, () => console.log(`App is listening at port ${PORT}`));
