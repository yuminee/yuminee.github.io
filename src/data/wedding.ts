export const WEDDING = {
  groom: {
    name: "조욱남",
    fatherName: "조OO",
    motherName: "OOO",
    relation: "장남",
  },
  bride: {
    name: "박유민",
    fatherName: "박OO",
    motherName: "OOO",
    relation: "차녀",
  },
  date: {
    year: 2026,
    month: 6,
    day: 13,
    dayOfWeek: "토요일",
    time: "오후 4시",
    iso: "2026-06-13T16:00:00+09:00",
  },
  venue: {
    name: "용산가족공원 야외예식장",
    address: "서울 용산구 서빙고로 185",
    kakaoMapUrl: "https://place.map.kakao.com/17556513",
    naverMapUrl: "https://naver.me/FJbYR9bk",
    directions: {
      subway: {
        label: "지하철",
        routes: [
          {
            station: "이촌역 (4호선 / 경의중앙선)",
            details: [
              "2번출구 → 도로 옆 인도 도보 10분",
              "박물관방향 출구 → 중앙박물관 내부 오솔길 도보 15분",
            ],
          },
        ],
      },
      bus: {
        label: "버스",
        routes: [
          {
            station: "용산역에서",
            details: [
              "502번, 400번 버스 이용",
              "'국립중앙박물관 용산가족공원' 정류장 하차 후 도보 10분",
            ],
          },
        ],
      },
      car: {
        label: "자차",
        details: [
          "국립중앙박물관 혹은 용산가족공원 주차장 이용",
          "* 주말에는 주차장이 혼잡하므로 대중교통을 이용하시면 보다 편하게 참석하실 수 있습니다.",
        ],
      },
    },
  },
  accounts: {
    groom: [
      {
        role: "신랑",
        name: "조욱남",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
      {
        role: "신랑 아버지",
        name: "조OO",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
      {
        role: "신랑 어머니",
        name: "OOO",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
    ],
    bride: [
      {
        role: "신부",
        name: "박유민",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
      {
        role: "신부 아버지",
        name: "박OO",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
      {
        role: "신부 어머니",
        name: "OOO",
        bank: "OO은행",
        account: "000-0000-0000-00",
      },
    ],
  },
  greeting:
    "서로 다른 길을 걷던 두 사람이\n같은 곳을 바라보며 함께 걸어가려 합니다.\n\n용산가족공원의 푸른 하늘 아래\n저희의 새로운 시작을\n축복해 주시면 감사하겠습니다.",
};
