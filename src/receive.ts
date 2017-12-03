import * as RabbitMQ from './basic_service/rabbitmq';

RabbitMQ.create_channel().then((ch) => { 
 const queue = 'task_hello';
 ch.assertQueue(queue, {durable: true});
 ch.prefetch(1);
 ch.consume(queue, (msg) => {
  console.log(msg.content.toString());
  ch.ack(msg);
 }, {noAck: false});
}).catch((err) => {
  console.log(err);
})
