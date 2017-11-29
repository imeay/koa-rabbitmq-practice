var amqp = require('amqplib/callback_api');
var amqp_promise = new Promise(function (resolve, reject) {
    amqp.connect('amqp://localhost', function (err, conn) {
        if (err) {
            reject(err);
        }
        else {
            resolve(conn);
        }
    });
});
amqp_promise.then(function (conn) {
    conn.createChannel(function (err, ch) {
        var queue = 'task_hello';
        ch.assertQueue(queue, { durable: true });
        ch.prefetch(1);
        ch.consume(queue, function (msg) {
            console.log(msg.content.toString() + Date.now());
            ch.ack(msg);
        }, { noAck: false });
    });
});
