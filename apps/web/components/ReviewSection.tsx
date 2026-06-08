"use client";

import { FormEvent, useEffect, useState } from "react";

type Review = {
  id: number;
  reviewerNickname: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

type ReviewResponse = {
  reviews: Review[];
  summary: {
    count: number;
    averageRating: number;
  };
};

type TokenPayload = {
  nickname?: string;
  email?: string;
};

function decodePayload(token: string): TokenPayload | null {
  try {
    const json = atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

export default function ReviewSection({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myNickname, setMyNickname] = useState("");

  async function loadReviews() {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    if (!res.ok) {
      setError("후기를 불러오지 못했습니다.");
      return;
    }

    const data = (await res.json()) as ReviewResponse;
    setReviews(data.reviews);
    setAverageRating(data.summary.averageRating);
    setCount(data.summary.count);
  }

  useEffect(() => {
    const token = localStorage.getItem("hs_access_token");
    if (token) {
      const payload = decodePayload(token);
      setMyNickname(payload?.nickname ?? payload?.email ?? "");
    }

    void loadReviews();
  }, [productId]);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!myNickname) {
      setError("로그인 후 후기를 작성할 수 있습니다.");
      return;
    }

    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        reviewerNickname: myNickname,
        rating,
        comment: comment.trim() || undefined
      })
    });

    if (!res.ok) {
      const raw = await res.text();
      try {
        const parsed = JSON.parse(raw) as { message?: string | string[] };
        const message = Array.isArray(parsed.message)
          ? parsed.message.join(", ")
          : parsed.message;
        setError(message || "후기 등록에 실패했습니다.");
      } catch {
        setError(raw || "후기 등록에 실패했습니다.");
      }
      setSubmitting(false);
      return;
    }

    setComment("");
    setRating(5);
    setSubmitting(false);
    await loadReviews();
  }

  return (
    <section className="review-section">
      <div className="review-summary">
        <h2>거래 후기</h2>
        <p>
          평점 <strong>{averageRating.toFixed(1)}</strong> / 5 ({count}개)
        </p>
      </div>

      <form className="review-form" onSubmit={submitReview}>
        <label>
          평점
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={5}>5 - 최고예요</option>
            <option value={4}>4 - 좋아요</option>
            <option value={3}>3 - 보통이에요</option>
            <option value={2}>2 - 아쉬워요</option>
            <option value={1}>1 - 별로예요</option>
          </select>
        </label>

        <label>
          코멘트 (선택)
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="거래 경험을 간단히 남겨주세요"
            rows={3}
          />
        </label>

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? "등록 중..." : "후기 등록"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="meta">아직 후기가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} className="review-item">
              <div className="review-head">
                <strong>{review.reviewerNickname}</strong>
                <span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
              </div>
              {review.comment && <p>{review.comment}</p>}
              <small>{new Date(review.createdAt).toLocaleDateString("ko-KR")}</small>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
