import mysql from "mysql";
// Config DB
var db = mysql.createConnection({
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
export { db };
