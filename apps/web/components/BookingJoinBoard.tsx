"use client";

import { useEffect, useState } from "react";

const regions = ["강북/경춘", "한강이남", "원주/영동", "충청", "영호남/제주"];

// 오늘 기준 25일치 날짜 생성
function getDates(count = 25) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date(2026, 5, 8); // 2026-06-08
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const dow = days[d.getDay()];
    return { label: `${m}/${day}(${dow})`, date: d };
  });
}

// 더미 카운트 (지역 × 날짜)
const bookingCounts: number[][] = [
  [279, 415, 343, 335, 312, 213, 245, 147, 137, 106, 123, 119, 123, 126, 63, 60, 64, 68, 77, 52, 54, 49, 44, 24, 26],
  [571, 739, 660, 525, 440, 352, 360, 301, 281, 256, 237, 236, 195, 168, 141, 137, 125, 137, 136, 88, 75, 53, 53, 21, 21],
  [214, 269, 263, 229, 240, 204, 199, 117, 111, 97, 100, 60, 43, 53, 33, 26, 27, 28, 23, 16, 23, 11, 6, 0, 0],
  [563, 794, 613, 577, 503, 359, 374, 251, 218, 231, 206, 168, 168, 179, 95, 74, 65, 52, 53, 61, 63, 42, 36, 18, 21],
  [42, 93, 115, 113, 87, 17, 2, 11, 10, 12, 12, 10, 4, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const joinCounts: number[][] = [
  [18, 25, 31, 27, 22, 8, 3, 11, 9, 7, 5, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42, 61, 55, 48, 39, 14, 5, 18, 15, 11, 9, 7, 5, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [15, 22, 19, 17, 14, 6, 2, 7, 5, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [38, 54, 47, 43, 35, 12, 4, 16, 13, 10, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 9, 11, 10, 8, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const dates = getDates(25);

export default function BookingJoinBoard() {
  const [tab, setTab] = useState<"booking" | "join">("booking");
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);

  const counts = tab === "booking" ? bookingCounts : joinCounts;
  const listPath = tab === "booking" ? "/booking_list.php" : "/join_list.php";

  const selectedRegion = regions[selectedRegionIdx];

  // 선택된 지역의 모든 날짜/시간대 데이터 생성
  const selectedRows = dates.flatMap((d, dateIdx) => 
    Array.from({ length: 4 }, (_, timeIdx) => {
      const id = selectedRegionIdx * 10000 + dateIdx * 10 + timeIdx + 1;
      const month = String(d.date.getMonth() + 1).padStart(2, "0");
      const day = String(d.date.getDate()).padStart(2, "0");
      const hour = String(6 + timeIdx * 2).padStart(2, "0");
      const typeLabel = tab === "booking" ? "부킹" : "조인";
      return {
        id,
        title: `${selectedRegion} ${typeLabel} ${timeIdx + 1}팀 모집`,
        course: `${selectedRegion.split("/")[0]} CC`,
        time: `${month}/${day} ${hour}:00`,
        need: tab === "booking" ? `${2 + (timeIdx % 2)}팀` : `${1 + (timeIdx % 3)}명`,
        status: timeIdx % 2 === 0 ? "모집중" : "마감임박",
        href: `${listPath}?area=${selectedRegionIdx + 1}&year=${d.date.getFullYear()}&month=${month}&day=${day}`,
      };
    })
  );

  function selectRegion(regionIdx: number) {
    setSelectedRegionIdx(regionIdx);
  }

  useEffect(() => {
    const focusBoard = () => {
      const board = document.getElementById("booking_join_board");
      if (board instanceof HTMLElement) {
        board.focus({ preventScroll: true });
      }
    };

    const onHashChange = () => {
      if (window.location.hash === "#booking_join_board") focusBoard();
    };

    const onDocClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (anchor?.getAttribute("href") === "#booking_join_board") {
        const bjTab = anchor.getAttribute("data-bj-tab");
        if (bjTab === "booking" || bjTab === "join") {
          setTab(bjTab);
        }
        // 해시가 이미 같아서 hashchange가 발생하지 않는 경우 처리
        setTimeout(focusBoard, 0);
      }
    };

    if (window.location.hash === "#booking_join_board") focusBoard();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <section className="gm-bj-board" id="booking_join_board" tabIndex={-1}>
      <div className="gm-bj-header">
        <div className="gm-bj-tabs">
          <button
            className={`gm-bj-tab${tab === "booking" ? " active" : ""}`}
            onClick={() => setTab("booking")}
          >
            부킹
          </button>
          <button
            className={`gm-bj-tab${tab === "join" ? " active" : ""}`}
            onClick={() => setTab("join")}
          >
            조인
          </button>
        </div>
        <a href={listPath}>전체보기</a>
      </div>

      <div className="gm-bj-body">
        <div className="gm-bj-region-col">
          <div className="gm-bj-region-head">지역</div>
          {regions.map((r) => (
            <div className="gm-bj-region-cell" key={r}>{r}</div>
          ))}
        </div>

        <div className="gm-bj-date-scroll">
          <div className="gm-bj-date-grid" style={{ gridTemplateColumns: `repeat(${dates.length}, minmax(52px, 1fr))` }}>
            {/* 헤더 행 */}
            {dates.map((d) => (
              <div className="gm-bj-cell head" key={d.label}>{d.label}</div>
            ))}
            {/* 지역별 카운트 행 */}
            {regions.map((r, ri) =>
              dates.map((d, di) => (
                <a
                  key={`${ri}-${di}`}
                  href={`${listPath}?area=${ri + 1}&year=${d.date.getFullYear()}&month=${String(d.date.getMonth() + 1).padStart(2, "0")}&day=${String(d.date.getDate()).padStart(2, "0")}`}
                  className={`gm-bj-cell count${selectedRegionIdx === ri ? " selected" : ""}`}
                  title={`${r} ${d.label} ${tab === "booking" ? "부킹" : "조인"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectRegion(ri);
                  }}
                >
                  {counts[ri][di]}
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="gm-bj-list" id={tab === "booking" ? "booking_list" : "join_list"}>
        <div className="gm-bj-list-head">
          <strong>{tab === "booking" ? "부킹" : "조인"} 현황</strong>
          <span>{selectedRegion} · {selectedRows.length}건</span>
        </div>
        <div className="gm-bj-list-table">
          <div className="gm-bj-list-row head">
            <span>제목</span>
            <span>코스</span>
            <span>일시</span>
            <span>{tab === "booking" ? "잔여팀" : "잔여인원"}</span>
            <span>상태</span>
          </div>
          {selectedRows.map((row) => (
            <a className="gm-bj-list-row" key={row.id} href={row.href}>
              <span>{row.title}</span>
              <span>{row.course}</span>
              <span>{row.time}</span>
              <span>{row.need}</span>
              <span className={row.status === "마감임박" ? "urgent" : "open"}>{row.status}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
