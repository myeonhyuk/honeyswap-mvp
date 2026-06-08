import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { ProductsModule } from "./products/products.module";
import { PrismaService } from "./prisma.service";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [AuthModule, ProductsModule, ChatModule, ReviewsModule],
  providers: [PrismaService]
})
export class AppModule {}
