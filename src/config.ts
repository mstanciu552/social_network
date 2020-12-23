import mysql from "mysql";

// Config DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "social_network_1",
});
export const configdb = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("DB connection established...");
  });
};

export { db };
