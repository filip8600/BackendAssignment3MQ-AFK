#!/usr/bin/env node
import mongoose from 'mongoose'
import { schema } from './reservation'

const reservationConnection = mongoose.createConnection('mongodb://localhost:27017/hotelMQ')
const ReservationModel = reservationConnection.model('Reservation', schema)

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0:any, connection:any) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1:any, channel:any) {
        if (error1) {
            throw error1;
        }

        var queue = 'hotelReservation';

        channel.assertQueue(queue, {
            durable: false,
            //basicQos: 1  //not the right way :( https://www.rabbitmq.com/consumer-prefetch.html
        });
        channel.prefetch(1)////Only One reciever at a time, to avoid concurency problems at db https://stackoverflow.com/a/48165997
        
	var queueConfirm ='hotelConfirms'
	channel.assertQueue(queueConfirm , {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function(msg:any) {
            console.log(" [x] Received %s", msg.content.toString());
            let booking=JSON.parse( msg.content)
            let { id } = await new ReservationModel(booking).save()
            console.log(booking.customerName + " "+id);

            channel.sendToQueue(queueConfirm ,Buffer.from(booking.customerEmail+";"+id))
        }, {
            noAck: true
        });
    });
});