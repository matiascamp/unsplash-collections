import { connect, connection } from "mongoose";

const url = 'mongodb+srv://campodonicomatias1:XS7x8e65uQ0walO1@cluster0.cghmlyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

type ConnectionState = {
    isConnected: boolean | number
}

const conn: ConnectionState = {
    isConnected: false
}

export const connectDb = async () => {

    if (conn.isConnected) return

    const db = await connect(url)

    conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
    console.log("connected")
})

connection.on('error', (error) => {
    console.log("error", error);

})


