require('dotenv/config');

// module.exports = {
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'mysql',
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  },
};
