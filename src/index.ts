import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as RabbitMQ from './basic_service/rabbitmq';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = { name: 'xiaochi' };
});

router.get('/send', async (ctx, next) => {
  const msg = ctx.query.msg || '';
  const ch = await RabbitMQ.create_channel();
  const queue = 'task_hello';
  ch.assertQueue(queue, {durable: true});
  ch.sendToQueue(queue, new Buffer(msg), { persistent: true});
  ctx.body = msg;  
});

router.get('/publish', async (ctx, next) => {
  const msg = ctx.query.msg || '';
  const ch = await RabbitMQ.create_channel();
  const queue = 'task_hello';
  const ex = 'log';
  ch.assertExchange( ex, 'fanout', {durable: false});
  ch.publish(ex, '', new Buffer(msg));
  ctx.body = msg; 
});

router.get('/topics', async (ctx, next) => {
  const { key, msg } = ctx.query;
  const ch = await RabbitMQ.create_channel();
  const queue = 'task_hello';
  const ex = 'topic';
  ch.assertExchange(ex, 'topic', {durable: false});
  ch.publish(ex, key, new Buffer(msg));
  ctx.body = msg;  
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
 console.log('listen 3000');
});

