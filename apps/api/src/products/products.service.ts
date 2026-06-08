import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateProductDto, UpdateProductStatusDto } from "./products.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { seller: { select: { id: true, nickname: true } } }
    });
  }

  findMine(sellerId: number) {
    return this.prisma.product.findMany({
      where: { sellerId },
      orderBy: { createdAt: "desc" }
    });
  }

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { seller: { select: { id: true, nickname: true } } }
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async create(sellerId: number, dto: CreateProductDto) {
    const user = await this.prisma.user.findUnique({ where: { id: sellerId } });
    if (!user) {
      throw new NotFoundException("Seller not found");
    }

    return this.prisma.product.create({
      data: {
        sellerId,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        region: dto.region,
        imageUrl: dto.imageUrl
      }
    });
  }

  async updateStatus(requesterId: number, id: number, dto: UpdateProductStatusDto) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Product not found");
    }

    if (existing.sellerId !== requesterId) {
      throw new ForbiddenException("Only seller can update status");
    }

    return this.prisma.product.update({
      where: { id },
      data: { status: dto.status }
    });
  }
}
