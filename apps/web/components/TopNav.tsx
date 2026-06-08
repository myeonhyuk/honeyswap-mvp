"use client";

export default function TopNav() {
  return (
    <nav className="topnav">
      <button type="button">로그인</button>
      <button type="button">회원가입</button>
      <button type="button" className="topnav-badge-link">장바구니 <span className="topnav-count">0</span></button>
      <button type="button" className="topnav-badge-link">채팅목록 <span className="topnav-count">0</span></button>
    </nav>
  );
}
