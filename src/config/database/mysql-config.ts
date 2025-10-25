import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js';

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});
