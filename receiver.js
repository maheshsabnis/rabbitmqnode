// queuename
var q = 'myqueue';
// connect to Rabbitmq
var open = require('amqplib').connect('amqp://localhost');

// Consumer
open.then((conn) => {
    // create the channel
    return conn.createChannel();
}).then((ch) => {
    // subscribe to the queue
    return ch.assertQueue(q).then((ok) => {
        // consume the message from queue
        return ch.consume(q, function(msg) {
            if (msg !== null) {
                // process the received message
                console.log(msg.content.toString());
                // send acknowledgement
                // to channel so that data can be purged from the queue
                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);