"use client";

type Props = {
  productId?: number;
  productTitle?: string;
  sellerId?: number;
  sellerNickname?: string;
};

export default function ChatStartButton(_props: Props) {
  return (
    <button
      className="btn-primary"
      type="button"
      onClick={() => alert("채팅 시작은 모바일 앱에서만 지원됩니다. 앱을 설치해 주세요.")}
    >
      앱에서 채팅 시작
    </button>
  );
}
