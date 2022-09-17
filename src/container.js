const awilix = require('awilix');
import process from 'node:process';
import express from 'express';
import bunyan from 'bunyan';
import {services} from '@shipwaves/api-libs';
import entities from './entities';

const router = express.Router();

const env = {
  ENV: 'development',
  PORT: process.env.PORT || '8000',
  SERVICE_NAME: 'shipwaves-api-rest-demo',
  COMMANDS_EXCHANGE_NAME: 'commands',
  COMMANDS_EXCHANGE_TYPE: 'topic',
  EVENTS_EXCHANGE_NAME: 'events',
  EVENTS_EXCHANGE_TYPE: 'topic',
  DEAD_LETTER_EXCHANGE_NAME: 'deadLetters',
  DEAD_LETTER_EXCHANGE_TYPE: 'topic',
  slack: {
    enabled: false,
  },
  AMQP: process.env.AMQP || 'amqp://127.0.0.1',
  DB: (process.env.MONGO || 'mongodb://localhost:27017') + '/shipwaves-api-rest-demo?authSource=admin',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};

const logger = bunyan.createLogger({
  name: 'shipwaves-api-rest-demo',
});

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.loadModules([
  'src/entities/**/*.js',
  'src/MainRouter.js',
]);
container.register({
  app: awilix.asValue(express()),
  router: awilix.asValue(router),
  log: awilix.asValue(logger),
  env: awilix.asValue(env),
  ...services,
});

[...entities, 'mainRouter'].forEach(entity => {
  container.resolve(entity);
});


export default container;
