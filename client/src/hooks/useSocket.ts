import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "ws://localhost:3500";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = useCallback((roomName: string) => {
    if (!roomName) return;
    socketRef.current?.emit("joinRoom", roomName);
    setCurrentRoom(roomName);
    setMessages([]); // clear previous messages
  }, []);

  const leaveRoom = useCallback(() => {
    if (!currentRoom) return;
    socketRef.current?.emit("leaveRoom", currentRoom);
    setCurrentRoom("");
    setMessages([]);
  }, [currentRoom]);

  const sendMessage = useCallback(
    (msg: string) => {
      if (!msg.trim() || !currentRoom) return;
      socketRef.current?.emit("message", { roomName: currentRoom, message: msg });
    },
    [currentRoom]
  );

  return { isConnected, messages, currentRoom, joinRoom, leaveRoom, sendMessage };
};
