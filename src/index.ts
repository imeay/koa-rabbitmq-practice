import * as Koa from 'koa';
import * as Router from 'koa-router';
const amqp = require('amqplib/callback_api');

const amqp_promise:any = new Promise( (resolve, reject) => {
   amqp.connect('amqp://localhost', function(err, conn) {
    if (err) {
     reject(err);
    } else {
     resolve(conn);
    }  
  });
});

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = { name: 'xiaochi' };
});

router.get('/send', async (ctx, next) => {
  const conn = await amqp_promise;
  ctx.body = 'send';

  conn.createChannel((err, ch) => {
      const queue = 'task_hello';
      ch.assertQueue(queue, {durable: true});
      ch.sendToQueue(queue, new Buffer('hello'), { persistent: true});
      console.log('send hello');  
    });
  
});



app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
 console.log('listen 3000');
});

