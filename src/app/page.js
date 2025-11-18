"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmergencyHome() {
  const router = useRouter();
  const [currentCountry, setCurrentCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 위치 기반 국가 자동 감지
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding을 통한 국가 감지 (간단한 버전)
            // 실제로는 Google Maps Geocoding API 사용 권장
            const { latitude, longitude } = position.coords;
            
            // 브라우저 언어로 기본 국가 추정
            const lang = navigator.language || navigator.userLanguage;
            let countryCode = "JP"; // 기본값
            
            if (lang.startsWith("ko")) countryCode = "KR";
            else if (lang.startsWith("ja")) countryCode = "JP";
            else if (lang.startsWith("en")) countryCode = "US";
            else if (lang.startsWith("zh")) countryCode = "CN";
            
            // localStorage에 저장
            localStorage.setItem("emergency.lastCountry", countryCode);
            setCurrentCountry(countryCode);
          } catch (error) {
            console.error("위치 감지 실패:", error);
            const saved = localStorage.getItem("emergency.lastCountry");
            setCurrentCountry(saved || "JP");
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          // 위치 권한 거부 시 저장된 국가 사용
          const saved = localStorage.getItem("emergency.lastCountry");
          setCurrentCountry(saved || "JP");
          setIsLoading(false);
        }
      );
    } else {
      const saved = localStorage.getItem("emergency.lastCountry");
      setCurrentCountry(saved || "JP");
      setIsLoading(false);
    }
  }, []);

  const handleQuickAccess = () => {
    if (currentCountry) {
      router.push(`/emergency?country=${currentCountry}`);
    } else {
      router.push("/emergency");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* 헤더 */}
      <header className="bg-red-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">🆘 Emergency Contact</h1>
        <p className="text-sm mt-1">긴급 상황, 3초 안에 도움받기</p>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* 원터치 긴급 호출 버튼 */}
        <div className="mb-8">
          <button
            onClick={handleQuickAccess}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span>로딩 중...</span>
            ) : currentCountry ? (
              <>
                <div className="text-3xl mb-2">🚨</div>
                <div>긴급 연락처</div>
                <div className="text-sm mt-1 opacity-90">
                  {currentCountry} 감지됨
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl mb-2">🚨</div>
                <div>긴급 연락처</div>
              </>
            )}
          </button>
        </div>

        {/* 빠른 액세스 메뉴 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            href="/emergency"
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-semibold">국가 선택</div>
          </Link>
          <Link
            href="/emergency/guide"
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-semibold">상황별 가이드</div>
          </Link>
        </div>

        {/* 긴급 상황별 빠른 링크 */}
        <div className="space-y-3 mb-8">
          <h2 className="font-bold text-lg mb-3">긴급 상황별</h2>
          
          <Link
            href="/emergency/guide?type=passport"
            className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">📘</div>
              <div>
                <div className="font-semibold">여권 분실</div>
                <div className="text-sm text-gray-600">대사관 연락처 및 절차</div>
              </div>
            </div>
          </Link>

          <Link
            href="/emergency/guide?type=hospital"
            className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏥</div>
              <div>
                <div className="font-semibold">병원 필요</div>
                <div className="text-sm text-gray-600">응급실 + 번역 카드</div>
              </div>
            </div>
          </Link>

          <Link
            href="/emergency/guide?type=crime"
            className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🚔</div>
              <div>
                <div className="font-semibold">범죄 피해</div>
                <div className="text-sm text-gray-600">경찰 + 대사관 동시 연락</div>
              </div>
            </div>
          </Link>
        </div>

        {/* 정보 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <div className="font-semibold mb-1">💡 팁</div>
          <div>이 앱은 오프라인에서도 작동합니다. 여행 전에 데이터를 다운로드하세요.</div>
        </div>
      </main>
    </div>
  );
}

