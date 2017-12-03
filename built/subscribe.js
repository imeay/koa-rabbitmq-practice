"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RabbitMQ = require("./basic_service/rabbitmq");
RabbitMQ.create_channel().then(function (ch) {
    var ex = 'log';
    ch.assertExchange(ex, 'fanout', { durable: false });
    ch.assertQueue('', { exclusive: true }, function (err, q) {
        ch.bindQueue(q.queue, ex, '');
        ch.consume(q.queue, function (msg) {
            console.log(msg.content.toString());
        }, { noAck: true });
    });
});
