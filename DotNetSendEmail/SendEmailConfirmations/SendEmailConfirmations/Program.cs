//Based on example from https://www.rabbitmq.com/tutorials/tutorial-one-dotnet.html

using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

var factory = new ConnectionFactory() { HostName = "localhost" };
using (var connection = factory.CreateConnection())
{
    using (var channel = connection.CreateModel())
    {
        channel.QueueDeclare(queue: "hotelConfirm",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            //Send email :)
            Console.WriteLine(" [x] Sent email based on data: {0}", message);
        };
        channel.BasicConsume(queue: "hotelConfirm",
                             autoAck: true,
                             consumer: consumer);

        Console.WriteLine(" Press [enter] to exit.");
        Console.ReadLine();

    }
}
