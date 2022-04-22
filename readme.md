Step 0: Ensure mongodb is running on port 27017

Step 1: start mq with either  ``docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management ``
 or  ``npm run mq `` (in top folder)

 Step 2: Compile (In watch mode) all ts with  ``npm run compile `` in "HandleReservation", "NodeProducer" og "SendEmail"

 Step 3: Start listeners "HandleReservation" and "SendEmail" with command  ``npm start `` for each

 Step 4: Start node producer with  ``node dist/index.js `` (Can be run multiple times)

 Step 5: Start dotNet producer (f5 in Visual Studio)
