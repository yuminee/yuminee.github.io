export const WEDDING = {
  groom: {
    name: "조욱남",
    fatherName: "조재천",
    motherName: "정경미",
    relation: "아들",
  },
  bride: {
    name: "박유민",
    fatherName: "박기호",
    motherName: "이미순",
    relation: "딸",
  },
  date: {
    year: 2026,
    month: 6,
    day: 13,
    dayOfWeek: "토",
    time: "오후 4시",
    iso: "2026-06-13T16:00:00+09:00",
  },
  venue: {
    name: "용산가족공원 야외예식장",
    address: "서울 용산구 서빙고로 185",
    naverMapUrl:
      "https://map.naver.com/v5/search/%EC%9A%A9%EC%82%B0%EA%B0%80%EC%A1%B1%EA%B3%B5%EC%9B%90%20%EC%95%BC%EC%99%B8%EC%98%88%EC%8B%9D%EC%9E%A5",
    kakaoMapUrl:
      "https://map.kakao.com/?q=%EC%9A%A9%EC%82%B0%EA%B0%80%EC%A1%B1%EA%B3%B5%EC%9B%90%20%EC%95%BC%EC%99%B8%EC%98%88%EC%8B%9D%EC%9E%A5",
  },
  directions: {
    subway: {
      title: "이촌역에서",
      items: [
        "4호선 이촌역 2번 출구 > 도로 옆 인도 도보 10분",
        "박물관방향 출구 > 중앙박물관 내부 오솔길 도보 15분",
      ],
    },
    bus: {
      title: "용산역에서",
      items: [
        "502번 또는 400번 버스 이용 후,\n‘국립중앙박물관 용산가족공원’ 정류장 하차 후 도보 10분",
      ],
    },
    car: {
      title: "자가용 이용 시",
      items: ["‘국립중앙박물관’ 또는 ‘용산가족공원 주차장’ 이용"],
      note: "*주말에는 주차장이 혼잡하므로 대중교통을 이용하시면 보다 편하게 참석하실 수 있습니다.",
    },
  },
  greeting: {
    title: "결혼이란,",
    body: [
      "인생을 개인전에서",
      "팀전으로 만드는 것.",
      "",
      "앞으로 한 팀이 되어",
      "멋진 이인조가 되겠습니다.",
      "",
      "저희의 결혼식에",
      "초대합니다.",
    ],
    note: "결혼식장 정책상 화환 반입이 어려우니 양해 부탁드립니다",
  },
  accounts: {
    groom: [
      { role: "신랑", name: "조욱남", bank: "우리은행", account: "1002-048-238685" },
      { role: "신랑 아버지", name: "조재천", bank: "농협", account: "813015-56-027396" },
      { role: "신랑 어머니", name: "정경미", bank: "농협", account: "453819-56-137893" },
    ],
    bride: [
      { role: "신부", name: "박유민", bank: "우리은행", account: "1002-048-238685" },
      { role: "신부 아버지", name: "박기호", bank: "신한은행", account: "110444409944" },
      { role: "신부 어머니", name: "이미순", bank: "부산은행", account: "1122213023706" },
    ],
  },
  bus: {
    title: "부산 하객 버스",
    subtitle: "버스 탑승 여부를 알려주세요",
    description: [
      "부산에서 오시는 하객분들을 위해\n전세버스를 운행합니다.",
      "정보를 입력하시면\n신부 측 부모님께서 직접 전화로\n최종 확인 및 안내를 드릴 예정입니다.",
      "귀한 걸음 해주셔서 감사합니다.",
    ],
  },
};
