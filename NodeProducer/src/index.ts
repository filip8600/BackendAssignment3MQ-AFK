const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const port = 3001

var amqp = require('amqplib/callback_api');
//amqp.connect('amqp://localhost', function(error0:any, connection:any) {});

amqp.connect('amqp://localhost', function(error0:any, connection:any) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1:any, channel:any) {
    if (error1) {
      throw error1;
    }
    var queue = 'hotelReservation';//Change here to send to the other queue
    channel.assertQueue(queue, {
      durable: true,
    });

    var booking={
      hotelId: "5555",
      checkIn: "2022-10-10",
      checkOut: "2022-11-11",
      roomNo: 205,
      customerName: "Kurt Javasen",
      customerEmail:"kurt@node.dk",
      customerAddress:"Lillevej 11 8000 Bakkeby"
    }
    var msg = JSON.stringify(booking)



    channel.sendToQueue(queue, Buffer.from(msg),{
      //replyTo: "ResponseQueue"
    });
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
}, 500);  
});





