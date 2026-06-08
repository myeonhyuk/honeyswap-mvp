import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum ProductStatus {
  ON_SALE = "ON_SALE",
  RESERVED = "RESERVED",
  SOLD = "SOLD"
}

export class CreateProductDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsInt()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateProductStatusDto {
  @IsEnum(ProductStatus)
  status!: ProductStatus;
}
