using RabbitMQ.Client;
using SendReservation.Models;
using System.Text;
using System.Text.Json;


var factory = new ConnectionFactory() { HostName = "localhost" };
using (var connection = factory.CreateConnection())
{
    using (var channel = connection.CreateModel())
    {
        channel.QueueDeclare(queue: "hotelReservation",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

        Reservation reservation = new Reservation
        {
            hotelId = 5555,
            checkIn = "2022-10-10",
            checkOut = "2022-11-11",
            roomNo = 303,
            customerAddress = "Lillevej 11 8000 Bakkeby",
            customerName = "Kurt Netsen",
            customerEmail = "kurt@dotNet.dk"
        };

        string message = JsonSerializer.Serialize(reservation);
        var body = Encoding.UTF8.GetBytes(message);

        while (true)
        {
            channel.BasicPublish(
                exchange: "",
                     routingKey: "hotelReservation",
                     basicProperties: null,
                     body: body);
            Console.WriteLine(" [x] Sent {0}\n\nPress any key to send again", message);
            Console.ReadKey();
        }

    }
}
