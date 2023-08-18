const fs = require("fs-extra");

try {
    fs.ensureDir("allure-report");
    fs.emptyDir("allure-report");
    fs.ensureDir("allure-results");
    fs.emptyDir("allure-results");
} catch (error) {
    console.log("Folder not created! " + error)
}