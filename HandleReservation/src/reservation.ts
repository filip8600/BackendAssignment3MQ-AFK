import { Schema } from 'mongoose'

export interface Reservation {
    hotelId: string
    checkIn: string
    checkOut: string
    roomNo: number
    customerName: string
    customerEmail:string
    customerAddress:string
}

export const schema = new Schema<Reservation>({
    hotelId: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    roomNo: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail:{ type: String, required: true },
    customerAddress:{ type: String, required: true },
})