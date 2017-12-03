import * as RabbitMQ from './basic_service/rabbitmq'; 

RabbitMQ.create_channel().then((ch) => {
  const ex = 'log';
  ch.assertExchange(ex, 'fanout', {durable: false});
  ch.assertQueue('', {exclusive: true}, (err, q) => {
    ch.bindQueue(q.queue, ex, '');
    ch.consume(q.queue, (msg) => {
      console.log(msg.content.toString());
    }, {noAck: true});
  });
});


