import mysql from "mysql";
import dotenv from "dotenv";
// Config DB
export var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "social_network_1",
});
export var configdb = function () {
    db.connect(function (err) {
        if (err)
            throw err;
        console.log("DB connection established...");
    });
};
export var envConfig = function () {
    dotenv.config();
};
