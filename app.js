require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride((req) => req.body && req.body._method));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => res.redirect("/produtos"));
app.use("/produtos", require("./src/routers/routeProduto"));
app.use("/produtos", require("./src/routers/RouteEditar"));
app.use("/produtos", require("./src/routers/RouterExcluir"));


module.exports = app;
