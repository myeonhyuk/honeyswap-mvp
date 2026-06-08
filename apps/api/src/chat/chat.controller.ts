import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("rooms")
  createRoom(
    @Body()
    body: {
      productId: number;
      productTitle: string;
      sellerNickname: string;
      buyerNickname: string;
    }
  ) {
    return this.chatService.findOrCreateRoom(body);
  }

  @Get("rooms")
  getRooms(@Query("nickname") nickname?: string) {
    return this.chatService.getRoomsByUser(nickname ?? "");
  }

  @Get("rooms/:roomId")
  async getRoom(@Param("roomId", ParseIntPipe) roomId: number) {
    const room = await this.chatService.getRoomById(roomId);
    if (!room) {
      throw new NotFoundException("Room not found");
    }
    return room;
  }

  @Get(":roomId/messages")
  getMessages(@Param("roomId", ParseIntPipe) roomId: number) {
    return this.chatService.getMessages(roomId);
  }

  @Post(":roomId/messages")
  postMessage(
    @Param("roomId", ParseIntPipe) roomId: number,
    @Body() body: { sender: string; text: string }
  ) {
    return this.chatService.addMessage(roomId, body.sender, body.text);
  }
}
