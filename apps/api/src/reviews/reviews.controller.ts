import { Body, Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CreateReviewDto } from "./reviews.dto";
import { ReviewsService } from "./reviews.service";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  list(@Query("productId", ParseIntPipe) productId: number) {
    return this.reviewsService.list(productId);
  }

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }
}
