"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const GUIDE_TYPES = {
  passport: {
    title: "여권 분실",
    icon: "📘",
    steps: [
      "즉시 현지 경찰서에 신고 (신고서 발급 필수)",
      "한국 대사관/영사관에 연락하여 분실 신고",
      "여권 재발급 신청 (여권 사진, 신분증 사본 필요)",
      "비상여권 발급 (긴급 시, 유효기간 1년)",
      "항공권 예약 정보 확인 (재입국 시 필요)",
    ],
    contacts: [
      "한국 대사관/영사관 (최우선)",
      "현지 경찰서",
      "항공사 고객센터",
    ],
  },
  hospital: {
    title: "병원 필요",
    icon: "🏥",
    steps: [
      "응급실로 이동 (구급차 호출: 119 또는 현지 긴급번호)",
      "한국어 통역 서비스 요청 (대사관에 문의)",
      "보험 카드 및 여권 지참",
      "의료비 선결제 후 보험 청구 (보험사에 문의)",
      "진단서 및 영수증 보관 (보험 청구용)",
    ],
    contacts: [
      "구급차 (119 또는 현지 긴급번호)",
      "한국 대사관/영사관",
      "여행보험사",
    ],
    phrases: [
      { ko: "병원에 가야 합니다", en: "I need to go to the hospital" },
      { ko: "구급차를 불러주세요", en: "Please call an ambulance" },
      { ko: "통역이 필요합니다", en: "I need an interpreter" },
      {
        ko: "한국어를 할 수 있는 의사가 있나요?",
        en: "Is there a doctor who speaks Korean?",
      },
    ],
  },
  crime: {
    title: "범죄 피해",
    icon: "🚔",
    steps: [
      "즉시 현지 경찰에 신고 (110 또는 현지 긴급번호)",
      "한국 대사관/영사관에 즉시 연락",
      "신고서 사본 보관 (보험 청구 및 재발급 시 필요)",
      "피해 증거 수집 (사진, 증인 정보 등)",
      "보험사에 신고 (여행보험)",
    ],
    contacts: [
      "현지 경찰 (최우선)",
      "한국 대사관/영사관",
      "여행보험사",
    ],
    phrases: [
      { ko: "도둑을 맞았습니다", en: "I was robbed" },
      { ko: "경찰을 불러주세요", en: "Please call the police" },
      { ko: "도움을 요청합니다", en: "I need help" },
    ],
  },
};

export default function EmergencyGuidePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");

  // 🚫 useSearchParams 대신, URLSearchParams로 쿼리 읽기
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam && GUIDE_TYPES[typeParam]) {
      setSelectedType(typeParam);
    }
  }, []);

  const guide = selectedType ? GUIDE_TYPES[selectedType] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-white hover:bg-red-700 p-2 rounded"
          >
            ← 뒤로
          </button>
          <h1 className="text-lg font-bold">상황별 가이드</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* 가이드 타입 선택 */}
      {!selectedType && (
        <div className="p-4">
          <div className="space-y-3">
            {Object.entries(GUIDE_TYPES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{value.icon}</div>
                  <div>
                    <div className="font-bold text-lg">{value.title}</div>
                    <div className="text-sm text-gray-600">
                      절차 및 연락처 안내
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 가이드 상세 */}
      {guide && (
        <div className="p-4">
          <div className="bg-white rounded-xl p-6 shadow-md mb-4">
            <div className="text-4xl mb-3">{guide.icon}</div>
            <h2 className="text-2xl font-bold mb-4">{guide.title}</h2>

            {/* 절차 */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">📋 절차</h3>
              <ol className="space-y-2">
                {guide.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-red-600">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 연락처 */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">📞 연락처</h3>
              <ul className="space-y-2">
                {guide.contacts.map((contact, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-red-600">•</span>
                    <span>{contact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 유용한 표현 */}
            {guide.phrases && (
              <div>
                <h3 className="font-bold text-lg mb-3">💬 유용한 표현</h3>
                <div className="space-y-2">
                  {guide.phrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <div className="font-semibold mb-1">{phrase.ko}</div>
                      <div className="text-sm text-gray-600">{phrase.en}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 빠른 액세스 버튼 */}
          <div className="space-y-2">
            <button
              onClick={() => router.push("/emergency")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              긴급 연락처 보기
            </button>
            <button
              onClick={() => setSelectedType("")}
              className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold transition-colors"
            >
              다른 상황 선택
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
