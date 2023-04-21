const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

const dataDir = path.resolve(`${process.cwd()}${path.sep}`);
const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

const renderTemplate = (res, req, template, data = {}) => {
    // Default base data which passed to the ejs template by default.
    const baseData = {
        path: req.path,
    };
    // We render template using the absolute path of the template and the merged default data with the additional data provided.
    res.render(
        path.resolve(`${templateDir}${path.sep}${template}`),
        Object.assign(baseData, data),
    );
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());

// mongoose.connect(process.env.mongoUri, {
//     keepAlive: true
// }).then(() => console.log(chalk.green("Connected to database")));


app.use("/assets", express.static(path.resolve(`${dataDir}${path.sep}assets`)));

// const testRouter = require("./routes/testRouter.js");
// app.use("/testRoute", chemolinoRouter);

app.get("/", (req, res) => {
    renderTemplate(res, req, "main.ejs", {
        msg: "Willkommen!"
    })
})

app.listen(process.env.PORT, null, null, () =>
    console.log(`Server is running on port ${process.env.PORT}`),
);