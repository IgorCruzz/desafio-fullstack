require('dotenv').config

module.exports = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
}
