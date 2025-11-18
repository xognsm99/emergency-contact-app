// src/app/utils/loadPack.js

const PACKS = {
  KR: {
    id: "KR",
    code: "KR",
    name: "대한민국",
    lang: "ko",
    emergency: {
      police: "112",
      ambulance: "119",
      fire: "119",
    },
    embassy: {
      name: "외교부 영사콜센터",
      phone: "+82-2-3210-0404",
      note: "해외에서 한국 관련 긴급 상황 시",
    },
  },
  JP: {
    id: "JP",
    code: "JP",
    name: "일본",
    lang: "ja",
    emergency: {
      police: "110",
      ambulance: "119",
      fire: "119",
    },
    embassy: {
      name: "주일 대한민국 대사관",
      phone: "+81-3-3455-2601",
      note: "",
    },
  },
  US: {
    id: "US",
    code: "US",
    name: "미국",
    lang: "en",
    emergency: {
      police: "911",
      ambulance: "911",
      fire: "911",
    },
    embassy: {
      name: "주미 대한민국 대사관",
      phone: "+1-202-939-5600",
      note: "",
    },
  },
  // TODO: 여기 밑으로 나라 계속 추가
  CN: {
  id: "CN",
  code: "CN",
  name: "중국",
  lang: "zh",
  emergency: {
    police: "110",      // 경찰
    ambulance: "120",   // 구급차
    fire: "119",        // 소방
  },
  embassy: {
    name: "주중 대한민국 대사관",
    phone: "+86-10-8531-0700",
    note: "중국 내 한국 관련 긴급 상황 시",
  },
},
TH: {
  id: "TH",
  code: "TH",
  name: "태국",
  lang: "th",
  emergency: {
    police: "191",      // 경찰
    ambulance: "1669",  // 구급차 / 응급의료
    fire: "199",        // 소방
  },
  embassy: {
    name: "주태국 대한민국 대사관",
    phone: "+66-2-347-9800",
    note: "태국 내 한국 관련 긴급 상황 시",
  },
},
VN: {
  id: "VN",
  code: "VN",
  name: "베트남",
  lang: "vi",
  emergency: {
    police: "113",      // 경찰
    ambulance: "115",   // 구급차
    fire: "114",        // 소방
  },
  embassy: {
    name: "주베트남 대한민국 대사관",
    phone: "+84-24-3831-5111",
    note: "베트남 내 한국 관련 긴급 상황 시",
  },
},
SG: {
  id: "SG",
  code: "SG",
  name: "싱가포르",
  lang: "en",
  emergency: {
    police: "999",      // 경찰
    ambulance: "995",   // 구급/소방 (SCDF)
    fire: "995",        // 소방
  },
  embassy: {
    name: "주싱가포르 대한민국 대사관",
    phone: "+65-6256-1188",
    note: "싱가포르 내 한국 관련 긴급 상황 시",
  },
},
MY: {
  id: "MY",
  code: "MY",
  name: "말레이시아",
  lang: "ms",
  emergency: {
    police: "999",      // 경찰
    ambulance: "999",   // 구급
    fire: "994",        // 소방 (지역에 따라 999로 통합되기도 함)
  },
  embassy: {
    name: "주말레이시아 대한민국 대사관",
    phone: "+60-3-4251-2336",
    note: "말레이시아 내 한국 관련 긴급 상황 시",
  },
},
PH: {
  id: "PH",
  code: "PH",
  name: "필리핀",
  lang: "en",
  emergency: {
    police: "911",      // 경찰
    ambulance: "911",   // 구급
    fire: "911",        // 소방
  },
  embassy: {
    name: "주필리핀 대한민국 대사관",
    phone: "+63-2-8856-9210",
    note: "필리핀 내 한국 관련 긴급 상황 시",
  },
},
ID: {
  id: "ID",
  code: "ID",
  name: "인도네시아",
  lang: "id",
  emergency: {
    police: "110",      // 경찰
    ambulance: "118",   // 구급
    fire: "113",        // 소방
  },
  embassy: {
    name: "주인도네시아 대한민국 대사관",
    phone: "+62-21-2967-2555",
    note: "인도네시아 내 한국 관련 긴급 상황 시",
  },
},
HK: {
  id: "HK",
  code: "HK",
  name: "홍콩",
  lang: "zh",
  emergency: {
    police: "999",      // 경찰
    ambulance: "999",   // 구급
    fire: "999",        // 소방
  },
  embassy: {
    name: "주홍콩 대한민국 총영사관",
    phone: "+852-2529-4141",
    note: "홍콩 · 마카오 내 한국 관련 긴급 상황 시",
  },
},
TW: {
  id: "TW",
  code: "TW",
  name: "대만",
  lang: "zh",
  emergency: {
    police: "110",      // 경찰
    ambulance: "119",   // 구급
    fire: "119",        // 소방
  },
  embassy: {
    name: "주타이베이 대한민국 대표부",
    phone: "+886-2-2758-8320",
    note: "대만 내 한국 관련 긴급 상황 시",
  },
},
GB: {
  id: "GB",
  code: "GB",
  name: "영국",
  lang: "en",
  emergency: {
    police: "999",      // 경찰
    ambulance: "999",   // 구급
    fire: "999",        // 소방
  },
  embassy: {
    name: "주영국 대한민국 대사관",
    phone: "+44-20-7227-5500",
    note: "영국 내 한국 관련 긴급 상황 시",
  },
},
FR: {
  id: "FR",
  code: "FR",
  name: "프랑스",
  lang: "fr",
  emergency: {
    police: "17",      // 경찰
    ambulance: "15",   // 구급(SAMU)
    fire: "18",        // 소방
  },
  embassy: {
    name: "주프랑스 대한민국 대사관",
    phone: "+33-1-4753-0101",
    note: "프랑스 내 한국 관련 긴급 상황 시",
  },
},
DE: {
  id: "DE",
  code: "DE",
  name: "독일",
  lang: "de",
  emergency: {
    police: "110",      // 경찰
    ambulance: "112",   // 구급
    fire: "112",        // 소방
  },
  embassy: {
    name: "주독일 대한민국 대사관",
    phone: "+49-30-260-650",
    note: "독일 내 한국 관련 긴급 상황 시",
  },
},
IT: {
  id: "IT",
  code: "IT",
  name: "이탈리아",
  lang: "it",
  emergency: {
    police: "113",      // 경찰
    ambulance: "118",   // 구급
    fire: "115",        // 소방
  },
  embassy: {
    name: "주이탈리아 대한민국 대사관",
    phone: "+39-06-8024-41",
    note: "이탈리아 내 한국 관련 긴급 상황 시",
  },
},
ES: {
  id: "ES",
  code: "ES",
  name: "스페인",
  lang: "es",
  emergency: {
    police: "112",      // 경찰
    ambulance: "112",   // 구급
    fire: "112",        // 소방
  },
  embassy: {
    name: "주스페인 대한민국 대사관",
    phone: "+34-91-353-2000",
    note: "스페인 내 한국 관련 긴급 상황 시",
  },
},
AU: {
  id: "AU",
  code: "AU",
  name: "호주",
  lang: "en",
  emergency: {
    police: "000",      // 경찰
    ambulance: "000",   // 구급
    fire: "000",        // 소방
  },
  embassy: {
    name: "주호주 대한민국 대사관",
    phone: "+61-2-6270-4100",
    note: "호주 내 한국 관련 긴급 상황 시",
  },
},
NZ: {
  id: "NZ",
  code: "NZ",
  name: "뉴질랜드",
  lang: "en",
  emergency: {
    police: "111",      // 경찰
    ambulance: "111",   // 구급
    fire: "111",        // 소방
  },
  embassy: {
    name: "주뉴질랜드 대한민국 대사관",
    phone: "+64-4-473-9073",
    note: "뉴질랜드 내 한국 관련 긴급 상황 시",
  },
},
CA: {
  id: "CA",
  code: "CA",
  name: "캐나다",
  lang: "en",
  emergency: {
    police: "911",      // 경찰
    ambulance: "911",   // 구급
    fire: "911",        // 소방
  },
  embassy: {
    name: "주캐나다 대한민국 대사관",
    phone: "+1-613-244-5010",
    note: "캐나다 내 한국 관련 긴급 상황 시",
  },
},
MX: {
  id: "MX",
  code: "MX",
  name: "멕시코",
  lang: "es",
  emergency: {
    police: "911",      // 경찰
    ambulance: "911",   // 구급
    fire: "911",        // 소방
  },
  embassy: {
    name: "주멕시코 대한민국 대사관",
    phone: "+52-55-5202-9864",
    note: "멕시코 내 한국 관련 긴급 상황 시",
  },
},
BR: {
  id: "BR",
  code: "BR",
  name: "브라질",
  lang: "pt",
  emergency: {
    police: "190",      // 경찰
    ambulance: "192",   // 구급(SAMU)
    fire: "193",        // 소방
  },
  embassy: {
    name: "주브라질 대한민국 대사관",
    phone: "+55-61-3214-5500",
    note: "브라질 내 한국 관련 긴급 상황 시",
  },
},
IN: {
  id: "IN",
  code: "IN",
  name: "인도",
  lang: "hi",
  emergency: {
    police: "112",      // 통합 긴급 번호 (기본)
    ambulance: "102",   // 구급
    fire: "101",        // 소방
  },
  embassy: {
    name: "주인도 대한민국 대사관",
    phone: "+91-11-4200-7000",
    note: "인도 내 한국 관련 긴급 상황 시",
  },
},
RU: {
  id: "RU",
  code: "RU",
  name: "러시아",
  lang: "ru",
  emergency: {
    police: "102",      // 경찰
    ambulance: "103",   // 구급
    fire: "101",        // 소방
  },
  embassy: {
    name: "주러시아 대한민국 대사관",
    phone: "+7-495-783-2727",
    note: "러시아 내 한국 관련 긴급 상황 시",
  },
},
TR: {
  id: "TR",
  code: "TR",
  name: "터키",
    lang: "tr",
    emergency: {
      police: "155",      // 경찰
      ambulance: "112",   // 구급
      fire: "110",        // 소방
    },
    embassy: {
      name: "주튀르키예 대한민국 대사관",
      phone: "+90-212-368-8300",
      note: "튀르키예 내 한국 관련 긴급 상황 시",
    },
},


};

export function loadPack(id) {
  const tryId = (id || "KR").toUpperCase();
  const pack = PACKS[tryId];

  if (!pack) {
    return {
      id: tryId,
      code: tryId,
      name: "데이터 없음",
      lang: "en",
      emergency: {},   // 번호 비어있으면 "정보 없음" 뜨게 처리
      embassy: {},
    };
  }

  return pack;
}

export function listAvailablePacks() {
  return Object.keys(PACKS);
}
