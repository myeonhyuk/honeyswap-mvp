import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  status: "ON_SALE" | "RESERVED" | "SOLD";
  region?: string;
  description?: string;
  imageUrl?: string | null;
  seller?: {
    id: number;
    nickname: string;
  };
};

const STATUS_LABEL: Record<string, string> = {
  ON_SALE: "판매중",
  RESERVED: "예약중",
  SOLD: "판매완료"
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card card-link">
      <div className="card-img-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="card-img" />
        ) : (
          <div className="card-img-placeholder">🛍️</div>
        )}
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="summary-line">{product.description ?? "상품 설명이 없습니다."}</p>
        <div className="meta">
          <span>{product.region ?? "지역 미정"}</span>
          <span className={`status-badge ${product.status === "ON_SALE" ? "status-on-sale" : product.status === "RESERVED" ? "status-reserved" : "status-sold"}`}>
            {STATUS_LABEL[product.status] ?? product.status}
          </span>
        </div>
        <div className="seller-line">판매자: {product.seller?.nickname ?? "미확인"}</div>
        <div className="price">{formatPrice(product.price)}원</div>
      </div>
    </Link>
  );
}
