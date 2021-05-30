const Development = {
    USER: "master",
    PASSWORD: "",
};

const Production = {
    USER: process.env.DBUSER, 
    PASSWORD: process.env.DBPASSWORD, 
}
module.exports = {
    ...(process.env.ENV === "prod" ? Production : Development),
    HOST: process.env.DBHOST,
    DB: process.env.MYLASTNAME, 
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}