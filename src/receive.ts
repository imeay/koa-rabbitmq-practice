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
amqp_promise.then((conn) => {
conn.createChannel((err,ch) => {
 const queue = 'task_hello';
 ch.assertQueue(queue, {durable: true});
 ch.prefetch(1);
 ch.consume(queue, (msg) => {
  console.log(msg.content.toString() + Date.now());
  ch.ack(msg);
}, {noAck: false});
});
});

