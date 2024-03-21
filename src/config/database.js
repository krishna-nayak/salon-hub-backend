module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_DEV,
    host: process.env.PSQL_HOST,
    dialect: "postgres",
    // logging: (msg) => console.count("help ", typeof msg),
  },
  docker_development: {
    username: process.env.DOCKER_USERNAME,
    password: process.env.DOCKER_PASSWORD,
    database: process.env.DOCKER_DATABASE_DEV,
    host: "node_db",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE_DEV,
    host: process.env.PROD_PSQL_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
};
