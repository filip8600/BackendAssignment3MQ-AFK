#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0:any, connection:any) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1:any, channel:any) {
        if (error1) {
            throw error1;
        }

        var queue = 'hotelConfirms';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg:any) {
		//Pseudo-code: GetEmail() SendEmail();
            console.log(" [x] Confirmation Mail sent with content: %s", msg.content.toString());
            channel.sendToQueue(msg.properties.replyTo,Buffer.from("Det er bare i orden!"))
        }, {
            noAck: true
        });
    });
});