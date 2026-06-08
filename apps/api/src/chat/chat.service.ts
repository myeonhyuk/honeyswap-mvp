import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateRoom(params: {
    productId: number;
    productTitle: string;
    sellerNickname: string;
    buyerNickname: string;
  }) {
    const existing = await this.prisma.chatRoom.findFirst({
      where: {
        productId: params.productId,
        sellerNickname: params.sellerNickname,
        buyerNickname: params.buyerNickname
      }
    });
    if (existing) return existing;

    return this.prisma.chatRoom.create({ data: params });
  }

  getRoomById(id: number) {
    return this.prisma.chatRoom.findUnique({ where: { id } });
  }

  getRoomsByUser(nickname: string) {
    return this.prisma.chatRoom.findMany({
      where: {
        OR: [{ sellerNickname: nickname }, { buyerNickname: nickname }]
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async getMessages(roomId: number) {
    return this.prisma.chatMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" }
    });
  }

  async addMessage(roomId: number, sender: string, text: string) {
    return this.prisma.chatMessage.create({
      data: { roomId, sender, text }
    });
  }
}
