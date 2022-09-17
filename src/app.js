import express from 'express';
import container from './container';

const router = container.resolve("router");
const [app, env, log] = ['app', 'env', 'log'].map(v => container.resolve(v));

app.use(express.json());
app.use('', router);
app.listen(env.PORT, () => {
  log.info('started server at', env.PORT);
});
