"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RabbitMQ = require("./basic_service/rabbitmq");
RabbitMQ.create_channel().then(function (ch) {
    var queue = 'task_hello';
    ch.assertQueue(queue, { durable: true });
    ch.prefetch(1);
    ch.consume(queue, function (msg) {
        console.log(msg.content.toString());
        ch.ack(msg);
    }, { noAck: false });
}).catch(function (err) {
    console.log(err);
});
