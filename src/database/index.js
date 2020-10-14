import 'dotenv/config';
import Sequelize from 'sequelize';
import User from '../app/models/User';
import Locations from '../app/models/Locations';
import databaseConfig from '../config/database';

const models = [User, Locations];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // this.connection = new Sequelize(databaseConfig);
    this.connection = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      databaseConfig
    );

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
