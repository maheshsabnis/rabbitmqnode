This is the simple Rabbit MQ application for communication across to Node.js apps.

Install Rabbit MQ from 

https://www.rabbitmq.com/install-windows.html#installer

package.json

{
    "name": "msexample",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "@types/amqplib": "^0.5.13",
        "amqplib": "^0.5.5",
        "amqplib-rabbitmq": "^1.0.2"
    }
}

Please run following commands to install all dependnecies
npm install 

sender.js, containing code for connecting queue and sending data
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

receiver.js
Contains code for connecting queue and receiving data
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