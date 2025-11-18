"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadPack } from "../utils/loadPack";

// 무료 국가 / 전체 국가 목록
const FREE_COUNTRIES = ["KR","JP", "US", "CN", "TH", "VN", "SG", "MY", "PH", "ID", "HK"];

const ALL_COUNTRIES = [
  { code: "JP", name: "일본", flag: "🇯🇵" },
  { code: "US", name: "미국", flag: "🇺🇸" },
  { code: "CN", name: "중국", flag: "🇨🇳" },
  { code: "TH", name: "태국", flag: "🇹🇭" },
  { code: "VN", name: "베트남", flag: "🇻🇳" },
  { code: "SG", name: "싱가포르", flag: "🇸🇬" },
  { code: "MY", name: "말레이시아", flag: "🇲🇾" },
  { code: "PH", name: "필리핀", flag: "🇵🇭" },
  { code: "ID", name: "인도네시아", flag: "🇮🇩" },
  { code: "HK", name: "홍콩", flag: "🇭🇰" },
  { code: "KR", name: "한국", flag: "🇰🇷" },
  { code: "TW", name: "대만", flag: "🇹🇼" },
  { code: "GB", name: "영국", flag: "🇬🇧" },
  { code: "FR", name: "프랑스", flag: "🇫🇷" },
  { code: "DE", name: "독일", flag: "🇩🇪" },
  { code: "IT", name: "이탈리아", flag: "🇮🇹" },
  { code: "ES", name: "스페인", flag: "🇪🇸" },
  { code: "AU", name: "호주", flag: "🇦🇺" },
  { code: "NZ", name: "뉴질랜드", flag: "🇳🇿" },
  { code: "CA", name: "캐나다", flag: "🇨🇦" },
  { code: "MX", name: "멕시코", flag: "🇲🇽" },
  { code: "BR", name: "브라질", flag: "🇧🇷" },
  { code: "IN", name: "인도", flag: "🇮🇳" },
  { code: "RU", name: "러시아", flag: "🇷🇺" },
  { code: "TR", name: "터키", flag: "🇹🇷" },
];

export default function EmergencyPage() {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [emergencyData, setEmergencyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 1) URL 쿼리에서 country 읽어서 초기값 설정 (/emergency?country=KR)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const c = params.get("country");
    if (c) {
      setSelectedCountry(c);
    }
  }, []);

  // 2) 나라 선택 시 데이터 로드
  useEffect(() => {
    if (!selectedCountry) return;

    setIsLoading(true);
    try {
      const data = loadPack(selectedCountry); // 동기 함수
      setEmergencyData(data);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("emergency.lastCountry", selectedCountry);
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
      setEmergencyData(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCountry]);

  // 검색 필터링
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return ALL_COUNTRIES;
    const term = searchTerm.toLowerCase();
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // 프리미엄 여부 (지금은 false 고정)
  const isPremium = false;

  const handleCall = (phoneNumber) => {
    if (!phoneNumber) return;
    const cleaned = phoneNumber.replace(/\s+/g, "");
    if (typeof window !== "undefined") {
      window.location.href = `tel:${cleaned}`;
    }
  };

  // 🔴 헤더의 뒤로 버튼: **무조건 홈(/)으로 이동**
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    } else {
      router.push("/");
    }
  };

  // 상세 화면에서 "다른 국가 선택" 버튼
  const handleSelectAnother = () => {
    setSelectedCountry("");
    // URL에서 country 쿼리 제거 (새로고침해도 리스트 보이도록)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("country");
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 (양옆 꽉 차게) */}
      <header className="bg-red-600 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="text-white hover:bg-red-700 px-3 py-2 rounded"
          >
            ← 뒤로
          </button>
          <h1 className="text-lg font-bold">긴급 연락처</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-md mx-auto pb-8">
        {/* 국가 선택 리스트 화면 */}
        {!selectedCountry && (
          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="국가 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredCountries.map((country) => {
                const isFree = FREE_COUNTRIES.includes(country.code);
                const isLocked = !isFree && !isPremium;

                return (
                  <button
                    key={country.code}
                    onClick={() => {
                      if (isLocked) return;
                      setSelectedCountry(country.code);

                      // URL에 country 쿼리 세팅
                      if (typeof window !== "undefined") {
                        const url = new URL(window.location.href);
                        url.searchParams.set("country", country.code);
                        window.history.replaceState(
                          null,
                          "",
                          url.toString()
                        );
                      }
                    }}
                    disabled={isLocked}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isLocked
                        ? "bg-gray-100 border-gray-300 opacity-50"
                        : "bg-white border-gray-200 hover:border-red-500 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-semibold">{country.name}</div>
                        <div className="text-xs text-gray-500">
                          {country.code}
                        </div>
                      </div>
                      {isLocked && (
                        <span className="ml-auto text-xs">🔒</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {!isPremium && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <div className="font-semibold mb-1">프리미엄 구독</div>
                <div className="text-gray-600">
                  전체 국가 접근 + 오프라인 모드 + 위젯 기능
                </div>
              </div>
            )}
          </div>
        )}

        {/* 선택된 국가 상세 화면 */}
        {selectedCountry && (
          <div className="p-4">
            {isLoading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : emergencyData ? (
              <div className="space-y-4">
                {/* 긴급번호 */}
                {emergencyData.emergency && (
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="font-bold text-lg mb-3">🚨 긴급번호</h2>
                    <div className="space-y-2">
                      {Object.entries(emergencyData.emergency).map(
                        ([key, value]) => (
                          <button
                            key={key}
                            onClick={() => handleCall(value?.number)}
                            className="w-full bg-red-50 hover:bg-red-100 p-3 rounded-lg text-left flex items-center justify-between transition-colors"
                          >
                            <div>
                              <div className="font-semibold">
                                {key === "police"
                                  ? "경찰"
                                  : key === "ambulance"
                                  ? "구급차"
                                  : key === "fire"
                                  ? "소방"
                                  : key}
                              </div>
                              <div className="text-sm text-gray-600">
                                {value?.number || "정보 없음"}
                              </div>
                            </div>
                            <div className="text-2xl">📞</div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* 한국 대사관 */}
                {emergencyData.embassy_kr && (
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="font-bold text-lg mb-3">🏛️ 한국 대사관</h2>
                    <div className="space-y-2">
                      <div>
                        <div className="font-semibold">
                          {emergencyData.embassy_kr.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {emergencyData.embassy_kr.address}
                        </div>
                      </div>
                      {emergencyData.embassy_kr.phones?.map((phone, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCall(phone.number)}
                          className="w-full bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-left flex items-center justify-between transition-colors"
                        >
                          <div>
                            <div className="font-semibold">{phone.label}</div>
                            <div className="text-sm text-gray-600">
                              {phone.number}
                            </div>
                          </div>
                          <div className="text-2xl">📞</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 병원 (옵션) */}
                {emergencyData.contacts?.hospital && (
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="font-bold text-lg mb-3">🏥 병원</h2>
                    <button
                      onClick={() =>
                        handleCall(emergencyData.contacts.hospital.phone)
                      }
                      className="w-full bg-green-50 hover:bg-green-100 p-3 rounded-lg text-left flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-semibold">
                          {emergencyData.contacts.hospital.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {emergencyData.contacts.hospital.phone}
                        </div>
                      </div>
                      <div className="text-2xl">📞</div>
                    </button>
                  </div>
                )}

                {/* 다른 국가 선택 */}
                <button
                  onClick={handleSelectAnother}
                  className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold transition-colors"
                >
                  다른 국가 선택
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  데이터를 불러올 수 없습니다.
                </div>
                <button
                  onClick={handleSelectAnother}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                  다시 선택
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
