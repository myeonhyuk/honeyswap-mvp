import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateReviewDto } from "./reviews.dto";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(productId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" }
    });

    const avg =
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return {
      reviews,
      summary: {
        count: reviews.length,
        averageRating: Number(avg.toFixed(1))
      }
    };
  }

  async create(dto: CreateReviewDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) {
      throw new BadRequestException("Product not found");
    }

    const exists = await this.prisma.review.findUnique({
      where: {
        productId_reviewerNickname: {
          productId: dto.productId,
          reviewerNickname: dto.reviewerNickname
        }
      }
    });

    if (exists) {
      throw new BadRequestException("이미 이 상품에 후기를 작성했습니다.");
    }

    return this.prisma.review.create({
      data: {
        productId: dto.productId,
        reviewerNickname: dto.reviewerNickname,
        rating: dto.rating,
        comment: dto.comment
      }
    });
  }
}
