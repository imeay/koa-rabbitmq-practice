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
        var ex = 'log';
        ch.assertExchange(ex, 'fanout', { durable: false });
        ch.assertQueue('', { exclusive: true }, function (err, q) {
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, function (msg) {
                console.log(msg.content.toString());
            }, { noAck: true });
        });
    });
});
