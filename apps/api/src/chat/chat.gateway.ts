import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({ cors: { origin: "*" }, namespace: "/chat" })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const roomId = client.handshake.query["roomId"];
    if (roomId) {
      void client.join(`room-${String(roomId)}`);
    }
  }

  @SubscribeMessage("joinRoom")
  async handleJoin(@MessageBody() roomId: number, @ConnectedSocket() client: Socket) {
    void client.join(`room-${roomId}`);
    const messages = await this.chatService.getMessages(roomId);
    return { event: "history", messages };
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody() data: { roomId: number; sender: string; text: string }
  ) {
    const message = await this.chatService.addMessage(data.roomId, data.sender, data.text);
    this.server.to(`room-${data.roomId}`).emit("message", message);
    return message;
  }
}
