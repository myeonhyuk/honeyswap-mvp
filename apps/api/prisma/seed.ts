import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hash1 = await bcrypt.hash("password123", 10);
  const demoSeller = await prisma.user.upsert({
    where: { email: "demo@honeyswap.kr" },
    update: {},
    create: {
      email: "demo@honeyswap.kr",
      passwordHash: hash1,
      nickname: "demoSeller"
    }
  });

  const hash2 = await bcrypt.hash("password123", 10);
  const seller2 = await prisma.user.upsert({
    where: { email: "seller2@test.com" },
    update: {},
    create: {
      email: "seller2@test.com",
      passwordHash: hash2,
      nickname: "seller2"
    }
  });

  await prisma.product.createMany({
    data: [
      {
        title: "아이폰 케이스",
        description: "iPhone 15 전용 케이스. 깨끗하게 사용했습니다.",
        price: 12000,
        region: "서울 강남구",
        sellerId: demoSeller.id
      },
      {
        title: "캠핑 의자 세트",
        description: "2회 사용했고 상태 양호합니다. 직거래 우선입니다.",
        price: 35000,
        region: "서울 마포구",
        sellerId: demoSeller.id
      },
      {
        title: "로그인 등록 성공 상품",
        description: "JWT 로그인 후 등록 확인용",
        price: 44000,
        region: "부산 수영구",
        sellerId: seller2.id
      }
    ]
  });

  console.log("Seed complete!");
  console.log("  demoSeller: demo@honeyswap.kr / password123");
  console.log("  seller2:    seller2@test.com / password123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
