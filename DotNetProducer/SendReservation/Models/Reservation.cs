namespace SendReservation.Models
{
    public class Reservation
    {
        public int hotelId { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string checkIn { get; set; } // ISO 8601 date
        public string checkOut { get; set; } // ISO 8601 date 
        public int roomNo { get; set; }
        public string customerName { get; set; }
        public string customerEmail { get; set; }
        public string customerAddress { get; set;}
    }
}
