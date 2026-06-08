import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtUser } from "../auth/jwt.strategy";
import { CreateProductDto, UpdateProductStatusDto } from "./products.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list() {
    return this.productsService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Get("mine")
  mine(@Request() req: { user: JwtUser }) {
    return this.productsService.findMine(req.user.sub);
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: { user: JwtUser }, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/status")
  updateStatus(
    @Request() req: { user: JwtUser },
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProductStatusDto
  ) {
    return this.productsService.updateStatus(req.user.sub, id, dto);
  }
}
