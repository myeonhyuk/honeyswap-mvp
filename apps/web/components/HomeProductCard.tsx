"use client";

import { useState } from "react";

interface HomeProductCardProps {
  name: string;
  price: string;
  originalPrice: string;
  tag: string;
  sold: string;
  image: string;
  badges?: string[];
  zzim: number;
  discountRate: number;
  href?: string;
}

export default function HomeProductCard({
  name, price, originalPrice, tag, sold, image, badges, zzim, discountRate, href = "/item.php"
}: HomeProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(zzim);

  function toggleLike() {
    setLiked((prev) => {
      setCount((c) => prev ? c - 1 : c + 1);
      return !prev;
    });
  }

  return (
    <a className="gm-product-card" href={href}>
      <div className="gm-card-thumb-wrap">
        <img className="gm-thumb" src={image} alt={name} loading="lazy" />
        <button
          className={`gm-zzim-btn${liked ? " active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleLike();
          }}
          aria-label="찜하기"
          type="button"
        >
          {liked ? "♥" : "♡"}
          <span className="gm-zzim-count">{count}</span>
        </button>
      </div>
      <span className="gm-tag">{tag}</span>
      <h3>{name}</h3>
      <p className="gm-original-price">{originalPrice}</p>
      <p className="gm-price-row">
        <strong className="gm-price">{price}</strong>
        <span className="gm-discount-rate">{discountRate}%</span>
      </p>
      <p className="gm-meta">{sold}</p>
      {badges && badges.length > 0 && (
        <p className="gm-sub-badges">
          {badges.map((b) => <span key={b} className="gm-sub-badge">{b}</span>)}
        </p>
      )}
    </a>
  );
}
