import BookingJoinBoard from "../components/BookingJoinBoard";
import HomeProductCard from "../components/HomeProductCard";

export default function HomePage() {
  const parsePrice = (value: string) => Number(value.replace(/[^\d]/g, ""));

  const getDiscountRate = (originalPrice: string, salePrice: string) => {
    const original = parsePrice(originalPrice);
    const sale = parsePrice(salePrice);
    if (!original || sale >= original) {
      return 0;
    }
    return Math.round(((original - sale) / original) * 100);
  };

  const categories = [
    "중고장터",
    "드라이버",
    "우드/유틸",
    "아이언",
    "웨지",
    "퍼터",
    "여성클럽",
    "왼손클럽",
    "골프백",
    "골프화/의류",
    "볼/용품",
    "풀세트",
    "파크골프"
  ];

  const menu = [
    {
      label: "부킹/조인",
      href: "#booking_join_board",
      items: ["부킹 리스트", "조인 리스트", "마감임박", "지역별 현황"]
    },
    {
      label: "중고존",
      href: "#download",
      items: ["드라이버", "아이언", "웨지", "퍼터", "헤드/샤프트"]
    },
    {
      label: "골프클럽",
      href: "#download",
      items: ["신상 클럽", "베스트 클럽", "커스텀 클럽", "브랜드관"]
    },
    {
      label: "렌탈존",
      href: "#download",
      items: ["단기 렌탈", "장기 렌탈", "렌탈 가이드", "렌탈 문의"]
    },
    {
      label: "의류&신발",
      href: "#download",
      items: ["남성 의류", "여성 의류", "골프화", "모자/벨트"]
    },
    {
      label: "용품",
      href: "#download",
      items: ["볼", "장갑", "거리측정기", "가방/파우치"]
    },
    {
      label: "골프투어",
      href: "#download",
      items: ["국내투어", "해외투어", "투어 후기", "예약 문의"]
    },
    {
      label: "골프레슨",
      href: "#download",
      items: ["원포인트", "입문 클래스", "프로 매칭", "레슨 후기"]
    },
    {
      label: "커뮤니티",
      href: "#community",
      items: ["인기글", "자유게시판", "스윙방", "중고거래 꿀팁"]
    }
  ];

  const GM_IMG = "https://www.golmarket.co.kr/data/list/thumb/";

  const productSections = [
    {
      title: "금주 특가",
      link: "특가 전체보기",
      items: [
        { name: "프리미엄 드라이버 컬렉션", price: "329,000원", originalPrice: "469,000원", tag: "오늘특가", sold: "131개 구매", image: `${GM_IMG}thumb-3731529073_zhogKNn1_100028429_324x324.jpg`, badges: ["무료배송", "카드할인"], zzim: 22 },
        { name: "PXG 니켈 카브레라이 퍼터 모음", price: "199,000원", originalPrice: "289,000원", tag: "한정수량", sold: "55개 구매", image: `${GM_IMG}thumb-3731529073_OYq7Hlu4_PXG_EB8B88ECBC84ED8AB8_ECBA98EB9FACEC9BA8EC9DB4_ED8DBCED84B0_EBAAA8EC9D8C_1000_324x324.jpg`, badges: ["무료배송"], zzim: 8 },
        { name: "다이나믹스 ZX5 초고거리 드라이버", price: "149,000원", originalPrice: "229,000원", tag: "무료배송", sold: "203개 구매", image: `${GM_IMG}thumb-3731529073_WDFs6lfc_1000_EB8BA4EC9DB4EC95842CZX5_ECA09CEAB1B0_324x324.jpg`, badges: ["무료배송", "카드할인"], zzim: 15 },
        { name: "단독특가 아이언 모음", price: "119,000원", originalPrice: "189,000원", tag: "할인", sold: "95개 구매", image: `${GM_IMG}thumb-3731529073_aEYc7pPf_1000EB8BA8EB8F85ED8AB9EAB080_324x324.jpg`, badges: ["무료배송"], zzim: 5 }
      ]
    },
    {
      title: "신상품",
      link: "신상품 더보기",
      items: [
        { name: "하이브리드 우드 유틸리티", price: "169,000원", originalPrice: "249,000원", tag: "신규", sold: "49개 구매", image: `${GM_IMG}thumb-3731529073_bzwDt3cM_600-2-ED9598EC9DB4EBB88CEBA6ACEB939CEC9CA0ED8BB8_324x324.jpg`, badges: ["무료배송"], zzim: 7 },
        { name: "야마하 아이언 모음 초가", price: "699,000원", originalPrice: "899,000원", tag: "입문추천", sold: "38개 구매", image: `${GM_IMG}thumb-3731529073_iAgJlUhS_1000_EC9584EC9DB4EC96B8EBAAA8EC9D8C_EC95BCEBA788ED9598_ECB694EAB080_324x324.jpg`, badges: ["무료배송", "카드할인"], zzim: 11 },
        { name: "무결점 스텝 웨지 컬렉션", price: "139,000원", originalPrice: "209,000원", tag: "무료배송", sold: "61개 구매", image: `${GM_IMG}thumb-3731529073_h3Zr4XLz_100028EBAFB8ECA688EB85B8ED8FACED95A829_324x324.jpg`, badges: ["무료배송"], zzim: 4 },
        { name: "사이드 파크골프 클럽 패키지", price: "259,000원", originalPrice: "339,000원", tag: "신상", sold: "44개 구매", image: `${GM_IMG}thumb-3731529073_EhUCta0c_100028EC82ACEC9D80ED928829_324x324.jpg`, badges: ["무료배송", "카드할인"], zzim: 9 }
      ]
    },
    {
      title: "중고존 추천",
      link: "중고존 전체보기",
      items: [
        { name: "아이언 세트 모음", price: "589,000원", originalPrice: "759,000원", tag: "인기", sold: "72개 구매", image: `${GM_IMG}thumb-3731529073_OWLl4msM_1000_324x324.jpg`, badges: ["검수완료"], zzim: 18 },
        { name: "골프백/보스턴백 모음", price: "79,000원", originalPrice: "129,000원", tag: "검수완료", sold: "84개 구매", image: `${GM_IMG}thumb-3731529073_HlgK8aw5_EC8DB8EB84A4EC9DBC_1000281529_324x324.jpg`, badges: ["검수완료", "무료배송"], zzim: 6 },
        { name: "골프장갑 모음", price: "29,000원", originalPrice: "59,000원", tag: "금주혜택", sold: "412개 구매", image: `${GM_IMG}thumb-3731529073_6VFz8cus_1000_2_324x324.jpg`, badges: ["무료배송"], zzim: 31 },
        { name: "새상품 아이언 세트", price: "39,000원", originalPrice: "69,000원", tag: "빠른배송", sold: "120개 구매", image: `${GM_IMG}thumb-3731529073_WKMXeAGE_100028EC8BA0EAB79C29_324x324.jpg`, badges: ["무료배송"], zzim: 13 }
      ]
    }
  ];

  const shortcuts = ["골마켓 APP", "오늘의 특가", "중고존 핫딜", "부킹 마감임박", "커뮤니티 인기글"];

  const communityPosts = [
    { id: 1, category: "스윙방", title: "드라이버 임팩트 때 손목 롤링 어떻게 하시나요?", comments: 28, views: 1840, date: "06.08" },
    { id: 2, category: "코스정보", title: "남서울CC 내장 후기 + 팁 (주말 예약 방법)", comments: 14, views: 932, date: "06.07" },
    { id: 3, category: "자유게시판", title: "골프 1년 됐는데 여전히 100타 벽... 고수분들 조언 부탁드려요", comments: 43, views: 3120, date: "06.07" },
    { id: 4, category: "중고거래 꿀팁", title: "중고 드라이버 살 때 꼭 확인해야 할 체크리스트 공유", comments: 19, views: 2240, date: "06.06" },
    { id: 5, category: "장비이야기", title: "테일러메이드 Qi10 vs 캘러웨이 패러독스 비교 사용기", comments: 37, views: 4850, date: "06.06" },
    { id: 6, category: "부킹/조인", title: "6/15(일) 경기도 남부권 조인 구합니다 (3인팀 1자리)", comments: 5, views: 480, date: "06.05" },
  ];

  const totalZzim = productSections
    .flatMap((section) => section.items)
    .reduce((sum, item) => sum + item.zzim, 0);

  return (
    <main className="gm-main">
      <section className="gm-utility-bar">
        <div className="gm-utility-left">
          <button type="button" className="gm-utility-dead">즐겨찾기</button>
          <button type="button" className="gm-utility-dead">앱다운로드</button>
          <button type="button" className="gm-utility-dead">바로가기 생성</button>
        </div>
        <div className="gm-utility-right">
          <a href="tel:1544-3158" className="gm-mobile-call-link">이벤트</a>
          <a href="tel:1544-3158" className="gm-mobile-call-link">광고문의 1544-3158</a>
        </div>
      </section>

      <section className="gm-search-row" id="intro">
        <div className="gm-logo-block">
          <strong>GOLF MARKET</strong>
          <span>골프 중고거래 · 부킹 · 커뮤니티</span>
        </div>
        <div className="gm-search-wrap">
          <input aria-label="상품 검색" placeholder="원하는 골프 상품을 검색해 보세요" />
          <button type="button">검색</button>
        </div>
        <div className="gm-top-actions">
          <a href="#download"><span className="gm-action-icon">APP</span>앱 다운로드</a>
          <a href="#booking_join_board"><span className="gm-action-icon">SELL</span>판매 등록</a>
        </div>
      </section>

      <section className="gm-search-shortcuts" aria-label="주요 바로가기">
        {shortcuts.map((item) => (
          <a
            key={item}
            href={
              item === "커뮤니티 인기글"
                ? "#community"
                : item === "부킹 마감임박"
                  ? "#booking_join_board"
                  : "#download"
            }
          >
            {item}
          </a>
        ))}
      </section>

      <div className="gm-layout-grid">
        <aside className="gm-side-category" aria-label="카테고리">
          <h3>중고장터</h3>
          <ul>
            {categories.map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </aside>

        <div className="gm-content-area">
          <section className="gm-menu-wrap" aria-label="주요 메뉴">
            <button type="button" className="gm-all-menu-btn">☰ 전체메뉴</button>
            <ul className="gm-menu-line">
              {menu.map((item) => (
                <li key={item.label} className="gm-menu-item">
                  <a href={item.href}>{item.label}</a>
                  <div className="gm-menu-dropdown" aria-label={`${item.label} 하위 메뉴`}>
                    <ul>
                      {item.items.map((subItem) => (
                        <li key={subItem}><a href="#download">{subItem}</a></li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="gm-market-status" aria-label="마켓 상태">
            <strong>실시간 상태</strong>
            <span>등록상품 18,420</span>
            <span>오늘 거래완료 1,274</span>
            <span>현재 접속자 2,301</span>
          </section>

          <section className="gm-hero-banners">
        <article className="gm-hero-main-banner">
          <p className="gm-banner-kicker">WEEKLY HOT DEAL</p>
          <h2>골프마켓 단독 특가전</h2>
          <p>드라이버, 아이언, 퍼터, 골프백까지 주간 추천 상품을 한 번에 확인하세요.</p>
          <a href="#download" className="gm-banner-link">기획전 보러가기</a>
        </article>
        <article className="gm-hero-side-banner">
          <strong>중고 장비 판매 등록</strong>
          <p>사진 3장과 기본 정보만 입력하면 등록 완료</p>
          <a href="#booking_join_board">등록 가이드 보기</a>
        </article>
          </section>

          <BookingJoinBoard />

          <section className="gm-ad-banner-row" aria-label="광고">
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_oWy6amQs_23.png" alt="골프 특가 광고" /></a>
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_xAasP0nS_25.png" alt="골프 브랜드 광고" /></a>
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_Z7dRYV3m_12.png" alt="골프 이벤트 광고" /></a>
          </section>

          <section className="gm-ad-portrait-row" aria-label="브랜드 광고">
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_Glmxf8zW_47.png" alt="골프 용품 광고" /></a>
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_VHJyK4I7_73_1.png" alt="골프 장비 광고" /></a>
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_2UzKs50c_36.png" alt="골프 클럽 광고" /></a>
            <a href="#download"><img referrerPolicy="no-referrer" src="https://www.golmarket.co.kr/data/banner/3731529073_aTicCfB0_13.png" alt="골프 액세서리 광고" /></a>
          </section>

          <section className="gm-promo-row">
        <article className="gm-promo-card">
          <strong>중고 거래 안전정책</strong>
          <p>에스크로와 거래 후기 시스템으로 믿을 수 있는 거래를 지원합니다.</p>
        </article>
        <article className="gm-promo-card">
          <strong>앱 전용 채팅 지원</strong>
          <p>상품 문의와 가격 제안은 앱에서 빠르게 확인할 수 있습니다.</p>
        </article>
        <article className="gm-promo-card">
          <strong>광고/입점 문의</strong>
          <p>브랜드 제휴와 프로모션 문의를 받습니다.</p>
        </article>
          </section>

          <div id="download" className="gm-section-stack">
        {productSections.map((section) => (
          <section className="gm-product-section" key={section.title}>
            <div className="gm-board-header">
              <h2>{section.title}</h2>
              <a href="#download">{section.link}</a>
            </div>
            <div className="gm-product-grid">
              {section.items.map((p, idx) => (
                <HomeProductCard
                  key={`${p.name}-${idx}`}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  tag={p.tag}
                  sold={p.sold}
                  image={p.image}
                  badges={p.badges}
                  zzim={p.zzim}
                  discountRate={getDiscountRate(p.originalPrice, p.price)}
                />
              ))}
            </div>
          </section>
        ))}
          </div>

          <section className="gm-community-section" id="community">
            <div className="gm-board-header">
              <h2>커뮤니티 인기글</h2>
              <a href="/community.php">전체보기</a>
            </div>
            <ul className="gm-community-list">
              {communityPosts.map((post) => (
                <li key={post.id} className="gm-community-item">
                  <span className="gm-community-cat">{post.category}</span>
                  <a href="/community.php" className="gm-community-title">{post.title}</a>
                  <span className="gm-community-meta">
                    <span>댓글 {post.comments}</span>
                    <span>조회 {post.views.toLocaleString()}</span>
                    <span>{post.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="gm-cs" id="partnership">
        <article className="gm-cs-main">
          <h3>골프마켓 고객센터</h3>
          <strong>1544-1234</strong>
          <p>운영시간: 평일 09:00 ~ 18:00</p>
          <p>주말/공휴일은 1:1 문의 접수만 가능합니다.</p>
        </article>
        <article className="gm-cs-notice">
          <h3>공지사항</h3>
          <ul>
            <li><a href="#">6월 카드사 무이자 할부 이벤트 안내</a><span>2026-06-01</span></li>
            <li><a href="#">중고존 이용 정책 개정 안내</a><span>2026-05-29</span></li>
            <li><a href="#">피싱/사기 예방 가이드</a><span>2026-05-20</span></li>
            <li><a href="#">광고/입점 제휴 프로세스 안내</a><span>2026-05-10</span></li>
          </ul>
        </article>
      </section>

      <footer className="gm-footer">
        <div className="gm-footer-links">
          <a href="#">회사소개</a>
          <a href="#">광고/입점/제휴문의</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">청소년 보호정책</a>
          <a href="#">이용약관</a>
          <a href="#">공지사항</a>
        </div>
        <p>상호: 골프마켓 주식회사 | 대표자: 홍길동 | 사업자등록번호: 123-45-67890</p>
        <p>주소: 서울 강남구 테헤란로 100 | 고객센터: 1544-1234 | support@golfmarket.example</p>
        <p className="gm-note">골프마켓은 통신판매중개자이며, 상품/거래 정보의 당사자가 아닙니다.</p>
      </footer>

      <aside className="gm-quick-panel" aria-label="퀵메뉴">
        <a href="#download">찜한상품 {totalZzim}</a>
        <a href="#download">장바구니 0</a>
        <a href="#download">최근본상품 12</a>
        <a href="#intro">TOP</a>
      </aside>
    </main>
  );
}
