import * as RabbitMQ from './basic_service/rabbitmq';
const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  process.exit(1);
}

const ch = RabbitMQ.create_channel().then((ch) => {
  var ex = 'topic';

  ch.assertExchange(ex, 'topic', {durable: false});

  ch.assertQueue('', {exclusive: true}, function(err, q) {
    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    args.forEach(function(key) {
      ch.bindQueue(q.queue, ex, key);
    });

    ch.consume(q.queue, function(msg) {
      console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }, {noAck: true});
 });
});
