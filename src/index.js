require('dotenv').config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const path = require('path');

const passport = require("./passport/setup");
const auth = require("./routes/auth");
const query = require("./routes/query");
const isAuth = require('./middleware/isAuth');

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log(`connecting to ${MONGO_URI}`);

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", auth);
app.use("/api/query/", query);

app.get("/", isAuth, (req, res) => {
    res.sendFile(path.join(__dirname, './views/main.html'));
});

app.get('/login', (req, res) => {
    console.log("logging in");
    res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));