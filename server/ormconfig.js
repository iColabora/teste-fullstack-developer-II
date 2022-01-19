const isLocal = process.env.NODE_ENV === 'development';

const mongoEntities = isLocal
  ? ['./src/modules/**/infra/typeorm/schemas/*.ts']
  : ['./dist/modules/**/infra/typeorm/schemas/*.js'];

module.exports = [
  {
    name: 'default',
    type: 'mongodb',
    logging: true,
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    useUnifiedTopology: true,
    entities: mongoEntities,
  },
];
