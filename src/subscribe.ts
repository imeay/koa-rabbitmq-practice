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
   const ex = 'log';
   ch.assertExchange(ex, 'fanout', {durable: false});
   ch.assertQueue('', {exclusive: true}, (err, q) => {
    ch.bindQueue(q.queue, ex, '');
    ch.consume(q.queue, (msg) => {
      console.log(msg.content.toString());
    }, {noAck: true});
   });
 });
});


