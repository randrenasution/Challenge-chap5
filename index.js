const { urlencoded } = require("express");
const express = require("express");
const { listen } = require("express/lib/application");
const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("hal1");
});

app.use((req, res, next) => {
    if (req.url === "/register" && !isLogin) {
        res.redirect("/login");
    }

    next();
});

app.get("/login", (req, res) => {
    res.render("login", {
        error: "",
    });
});

app.post("/login/auth", (req, res) => {
    const user = require("./db/user.json");

    if (user.email === req.body.uEmail && user.password === req.body.uPassword) {
        isLogin = true;
        res.redirect("/games");
    } else {
        res.render("login", {
            error: "Your password and email was wrong",
        });
    }
});

app.get("/games", (req, res) => {
    res.render("games");
});

app.listen(8000, () => console.log("your app is running.."));