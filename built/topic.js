"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RabbitMQ = require("./basic_service/rabbitmq");
var args = process.argv.slice(2);
if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
}
var ch = RabbitMQ.create_channel().then(function (ch) {
    var ex = 'topic';
    ch.assertExchange(ex, 'topic', { durable: false });
    ch.assertQueue('', { exclusive: true }, function (err, q) {
        console.log(' [*] Waiting for logs. To exit press CTRL+C');
        args.forEach(function (key) {
            ch.bindQueue(q.queue, ex, key);
        });
        ch.consume(q.queue, function (msg) {
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        }, { noAck: true });
    });
});
