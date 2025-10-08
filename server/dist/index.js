import { Server } from "socket.io";
import express from "express";
import uploadRouter from "./routes/upload";
const PORT = process.env.PORT || 3500;
const app = express();
const expressServer = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
app.use(express.json());
app.use('/api', uploadRouter);
const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production"
            ? false
            : ["http://localhost:5173", "http://127.0.0.1:5173"],
    },
});
const rooms = {};
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);
    // Join a room
    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        if (!rooms[roomName])
            rooms[roomName] = [];
        if (!rooms[roomName].includes(socket.id))
            rooms[roomName].push(socket.id);
        io.to(roomName).emit("message", `${socket.id.substring(0, 5)} joined the room`);
    });
    // Leave a room
    socket.on("leaveRoom", (roomName) => {
        socket.leave(roomName);
        console.log(`User ${socket.id} has leave this ${roomName} room`);
        if (rooms[roomName]) {
            rooms[roomName] = rooms[roomName].filter((id) => id !== socket.id);
        }
        io.to(roomName).emit("message", `${socket.id.substring(0, 5)} left the room`);
    });
    // Message in room
    socket.on("message", ({ roomName, message }) => {
        if (!roomName || !message)
            return;
        io.to(roomName).emit("message", `${socket.id.substring(0, 5)}: ${message}`);
    });
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        // Remove from all rooms
        for (const room in rooms) {
            rooms[room] = rooms[room].filter((id) => id !== socket.id);
            io.to(room).emit("message", `${socket.id.substring(0, 5)} left the room`);
        }
    });
});
//# sourceMappingURL=index.js.map