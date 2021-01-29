const amqp = require('amqplib');
// subscribing to the RabbitMQ
// default is localhost:15672
var open = require('amqplib').connect('amqp://localhost');

// Publisher
open.then((conn) => {
    return conn.createChannel(); // create channel so that message can be send
}).then(function(ch) {
    let queueName = 'myqueue'; // defining the queue-name
    // connect to queue 'myqueue' and then send message string, object, date, number
    // subscribe to queue by creating the queue in rabit mq 
    return ch.assertQueue(queueName).then((ok) => {
        // data to be send
        let obj = [{ id: 101, name: 'A' },
            { id: 102, name: 'B' },
            { id: 103, name: 'C' }
        ];
        // send data to the queue by buffering it
        return ch.sendToQueue(queueName, Buffer.from(JSON.stringify(obj)));
    });
}).catch(console.warn);