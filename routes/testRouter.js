const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

let router = express.Router();

const dataDir = path.resolve(`${process.cwd()}${path.sep}`);
const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

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

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

router.use(cookieParser());

router.get("/test", (req, res) => {
    renderTemplate(res, req, "main.ejs", {
        msg: "Haaaaa"
    })
});

module.exports = router;