/* =========================================================
 * Travel Explorer — single-page app logic
 * Pure vanilla JS, no dependencies.
 * ========================================================= */

const STORAGE_KEYS = {
  enquiries: "travelExplorer.enquiries",
  packing: "travelExplorer.packing",
  itinerary: "travelExplorer.itinerary",
  theme: "travelExplorer.theme",
  lang: "travelExplorer.lang",
};

/* =========================================================
 * I18N — state + helpers
 * ========================================================= */

const SUPPORTED_LANGS = ["en", "ja", "ko"];
let currentLang = "en";

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (_) {}
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : "en";
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(STORAGE_KEYS.lang, lang); } catch (_) {}
}

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.en;
  let s = (dict && dict[key]) || (I18N.en && I18N.en[key]) || key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ""));
  }
  return s;
}

/* Resolve a localised field on a data object. Field can be a plain string
 * (no localisation), or an object keyed by language: { en, ja, ko }. */
function loc(field) {
  if (field == null) return field;
  if (typeof field === "string") return field;
  if (Array.isArray(field)) return field;
  if (typeof field === "object") {
    return field[currentLang] || field.en || Object.values(field)[0];
  }
  return field;
}

/* =========================================================
 * UI dictionary
 * ========================================================= */

const I18N = {
  en: {
    "nav.home": "Home",
    "nav.guides": "Guides",
    "nav.cities": "Cities",
    "nav.tools": "Travel Tools",
    "nav.weather": "Weather",
    "nav.safety": "Safety",
    "nav.enquiry": "Enquiry",
    "hero.eyebrow": "SYS:: TRAVEL_EXPLORER // v2.0 // ONLINE",
    "hero.title": "We went, so you know where to go.",
    "hero.sub": "Curated travel guides with real prices, realistic itineraries, airport tips, safety notes, weather insights, and local recommendations.",
    "hero.cta.guides": "Read Latest Guide",
    "hero.cta.enquiry": "Send Enquiry",
    "hero.readout.nodes": "NODES",
    "hero.readout.uplink": "UPLINK",
    "hero.scroll": "// SCROLL",
    "hero.scroll_label": "Scroll to explore",
    "guides.eyebrow": "// MISSION_BRIEFING",
    "guides.title": "Real prices, real itineraries, no fluff.",
    "guides.lede": "We hop on the plane, walk the streets, eat at the hole-in-the-wall noodle shop, and bring back honest notes on twelve of Asia-Pacific's most loved cities.",
    "guides.stat.dossiers": "CITY DOSSIERS",
    "guides.stat.days": "FIELD DAYS",
    "guides.stat.notes": "NOTES LOGGED",
    "guides.stat.rarity": "RARITY TIER",
    "tools.eyebrow": "// LOADOUT",
    "tools.title": "Plan it before you board.",
    "tools.budget.title": "Trip Budget Calculator",
    "tools.budget.destination": "Destination",
    "tools.budget.travellers": "Travellers",
    "tools.budget.days": "Days",
    "tools.budget.daily": "Daily budget per person (SGD)",
    "tools.budget.result_label": "Estimated total",
    "tools.fx.title": "Currency Converter",
    "tools.fx.amount": "Amount (SGD)",
    "tools.fx.convert_to": "Convert to",
    "tools.fx.result_label": "Approx",
    "tools.fx.note": "Static reference rates. Swap in a live FX API for production.",
    "tools.packing.title": "Packing Checklist",
    "tools.packing.note": "Your ticks save automatically.",
    "tools.itinerary.title": "Itinerary Planner",
    "tools.itinerary.day": "Day",
    "tools.itinerary.time": "Time",
    "tools.itinerary.activity": "Activity",
    "tools.itinerary.activity_placeholder": "Visit Marina Bay Gardens",
    "tools.itinerary.notes": "Notes",
    "tools.itinerary.notes_placeholder": "Buy tickets in advance",
    "tools.itinerary.add_btn": "Add to itinerary",
    "tools.itinerary.empty": "No items yet — add your first activity above.",
    "tools.itinerary.remove": "Remove",
    "weather.eyebrow": "// ATMOS_SCAN",
    "weather.title": "Check before you pack.",
    "weather.placeholder": "Type a city (e.g. Tokyo)",
    "weather.check_btn": "Check Weather",
    "weather.checking": "Checking weather in {city}…",
    "weather.humidity": "Humidity",
    "weather.wind": "Wind",
    "weather.feels_like": "feels like",
    "weather.api_key_missing": "Add your OpenWeather API key in app.js to enable live weather. (Set OPENWEATHER_API_KEY at the top of the file.)",
    "weather.city_not_found": "City not found.",
    "weather.service_error": "Weather service returned {status}.",
    "weather.network_error": "Network error — try again.",
    "safety.eyebrow": "// THREAT_ASSESSMENT",
    "safety.title": "Travel smart, travel safe.",
    "safety.lede": "General advisories — always cross-check with your government's travel notices before you fly.",
    "safety.tip1.title": "Travel insurance",
    "safety.tip1.body": "Always buy comprehensive cover. Medical evacuation in Asia can run into five figures SGD.",
    "safety.tip2.title": "Embassy contacts",
    "safety.tip2.body": "Save your embassy's address and emergency line offline. Screenshot it before you fly.",
    "safety.tip3.title": "Scam awareness",
    "safety.tip3.body": "Use metered taxis, avoid \"closed temple\" tuk-tuk stories, never hand over your passport at small hotels.",
    "safety.tip4.title": "Water & food",
    "safety.tip4.body": "Bottled or filtered water in most of SE Asia. Eat where locals queue — busy stalls turn over fresh stock.",
    "safety.tip5.title": "Transport",
    "safety.tip5.body": "Prefer Grab, Uber, or licensed taxis. Helmet on every motorbike ride. Trust your gut at night.",
    "safety.tip6.title": "Health",
    "safety.tip6.body": "Pack a basic kit: rehydration salts, antihistamines, paracetamol, plasters. Check vaccine requirements 6 weeks out.",
    "safety.advisory_title": "Regional advisory snapshot",
    "safety.badge.singapore": "Singapore · Low",
    "safety.badge.japan": "Japan · Low",
    "safety.badge.south_korea": "South Korea · Low",
    "safety.badge.taiwan": "Taiwan · Low",
    "safety.badge.australia": "Australia · Low",
    "safety.badge.malaysia": "Malaysia · Moderate",
    "safety.badge.thailand": "Thailand · Moderate",
    "safety.badge.vietnam": "Vietnam · Moderate",
    "safety.badge.indonesia": "Indonesia · Moderate",
    "safety.badge.hong_kong": "Hong Kong · Moderate",
    "safety.badge.maldives": "Maldives · Moderate",
    "enquiry.eyebrow": "// TRANSMIT",
    "enquiry.title": "Tell us where you're dreaming of.",
    "enquiry.lede": "Drop us your details and we'll send a custom shortlist — itineraries, costs, and on-the-ground tips for your trip.",
    "enquiry.field.name": "Full Name *",
    "enquiry.field.email": "Email *",
    "enquiry.field.phone": "Phone",
    "enquiry.field.destination": "Destination of Interest",
    "enquiry.field.travel_date": "Travel Date",
    "enquiry.field.travellers": "Number of Travellers",
    "enquiry.field.message": "Message *",
    "enquiry.field.message_placeholder": "Tell us about your trip — interests, pace, budget...",
    "enquiry.submit_btn": "Submit Enquiry",
    "enquiry.other_option": "Other / Open to suggestions",
    "enquiry.validation": "Please fill in your name, a valid email, and a message.",
    "enquiry.success_sent": "Thanks! Your enquiry has been sent — we'll be in touch within 24 hours.",
    "enquiry.success_mailto": "Thanks! Your email client has opened with the enquiry — hit Send to deliver it.",
    "enquiry.error_email": "Saved locally, but email delivery failed. Please email us directly at {email}.",
    "footer.tag": "We went, so you know where to go.",
    "footer.note": "A static demo site. No bookings are processed here.",
    "modal.close_label": "Close guide",
    "modal.latest_guide": "Latest guide",
    "modal.flight": "Flight {value}",
    "modal.daily_from": "From {value}/day",
    "modal.best_season": "Best {value}",
    "modal.open_guide": "Open guide",
    "modal.view_guide": "View Guide",
    "modal.meta_line": "{country} · Flight {flight} · Best {season}",
    "modal.itinerary_heading": "Suggested 3-day itinerary",
    "modal.food_heading": "Food worth queueing for",
    "modal.transport_heading": "Getting around",
    "modal.cost_heading": "Estimated cost breakdown (per person, 3 days)",
    "modal.cost.Flights": "Flights",
    "modal.cost.Accommodation": "Accommodation",
    "modal.cost.Food": "Food",
    "modal.cost.Transport": "Transport",
    "modal.cost.Activities": "Activities",
    "modal.cost.Total": "Total",
    "modal.safety_heading": "Safety notes",
    "modal.photos_heading": "Best photo spots",
    "city.flight": "Flight",
    "city.daily": "Daily",
    "city.season": "Season",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.guides": "ガイド",
    "nav.cities": "都市",
    "nav.tools": "旅行ツール",
    "nav.weather": "天気",
    "nav.safety": "安全情報",
    "nav.enquiry": "お問い合わせ",
    "hero.eyebrow": "SYS:: TRAVEL_EXPLORER // v2.0 // オンライン",
    "hero.title": "私たちが行ったから、あなたの行き先がわかる。",
    "hero.sub": "実際の価格、現実的な旅程、空港の裏ワザ、安全情報、天気の傾向、現地の推薦まで揃った厳選トラベルガイド。",
    "hero.cta.guides": "最新ガイドを読む",
    "hero.cta.enquiry": "問い合わせを送る",
    "hero.readout.nodes": "拠点",
    "hero.readout.uplink": "通信",
    "hero.scroll": "// スクロール",
    "hero.scroll_label": "スクロールして探索",
    "guides.eyebrow": "// ミッション・ブリーフィング",
    "guides.title": "本物の価格、本物の旅程、ごまかしなし。",
    "guides.lede": "飛行機に飛び乗り、街を歩き、路地裏の麺屋で食べてきた。アジア太平洋の人気12都市について、正直なメモを持ち帰りました。",
    "guides.stat.dossiers": "都市ファイル",
    "guides.stat.days": "現地滞在日数",
    "guides.stat.notes": "記録したメモ",
    "guides.stat.rarity": "レアリティ",
    "tools.eyebrow": "// 装備",
    "tools.title": "搭乗前に計画を。",
    "tools.budget.title": "旅費計算ツール",
    "tools.budget.destination": "目的地",
    "tools.budget.travellers": "人数",
    "tools.budget.days": "日数",
    "tools.budget.daily": "1人あたり1日の予算 (SGD)",
    "tools.budget.result_label": "想定合計",
    "tools.fx.title": "通貨換算ツール",
    "tools.fx.amount": "金額 (SGD)",
    "tools.fx.convert_to": "換算先",
    "tools.fx.result_label": "概算",
    "tools.fx.note": "参考レートです。本番運用ではライブFX APIに差し替えてください。",
    "tools.packing.title": "持ち物チェックリスト",
    "tools.packing.note": "チェックは自動で保存されます。",
    "tools.itinerary.title": "旅程プランナー",
    "tools.itinerary.day": "日目",
    "tools.itinerary.time": "時間",
    "tools.itinerary.activity": "アクティビティ",
    "tools.itinerary.activity_placeholder": "例: マリーナベイ・ガーデンズを訪問",
    "tools.itinerary.notes": "メモ",
    "tools.itinerary.notes_placeholder": "事前にチケットを購入",
    "tools.itinerary.add_btn": "旅程に追加",
    "tools.itinerary.empty": "まだ項目がありません — 上から最初のアクティビティを追加してください。",
    "tools.itinerary.remove": "削除",
    "weather.eyebrow": "// 大気スキャン",
    "weather.title": "荷造り前にチェック。",
    "weather.placeholder": "都市名を入力 (例: Tokyo)",
    "weather.check_btn": "天気を確認",
    "weather.checking": "{city}の天気を取得中…",
    "weather.humidity": "湿度",
    "weather.wind": "風速",
    "weather.feels_like": "体感",
    "weather.api_key_missing": "ライブ天気を有効にするには app.js に OpenWeather の API キーを設定してください (ファイル冒頭の OPENWEATHER_API_KEY を更新)。",
    "weather.city_not_found": "都市が見つかりません。",
    "weather.service_error": "天気サービスのレスポンス: {status}。",
    "weather.network_error": "通信エラー — もう一度お試しください。",
    "safety.eyebrow": "// 脅威評価",
    "safety.title": "賢く、安全に旅をしよう。",
    "safety.lede": "一般的なアドバイザリーです — 出発前に必ずご自身の政府の渡航情報も確認してください。",
    "safety.tip1.title": "旅行保険",
    "safety.tip1.body": "必ず包括的な補償を購入しましょう。アジアの医療搬送費はSGDで5桁に達することもあります。",
    "safety.tip2.title": "大使館の連絡先",
    "safety.tip2.body": "大使館の住所と緊急連絡先をオフラインで保存。出発前にスクリーンショットを撮っておきましょう。",
    "safety.tip3.title": "詐欺への注意",
    "safety.tip3.body": "メーター付きタクシーを利用し、「寺院は今日閉まっている」というトゥクトゥクの誘いは無視。小規模ホテルでパスポートを預けないこと。",
    "safety.tip4.title": "水と食事",
    "safety.tip4.body": "東南アジアではボトル水か浄水を。地元の人が並ぶ店で食べれば、回転が早く新鮮です。",
    "safety.tip5.title": "交通",
    "safety.tip5.body": "Grab・Uber・正規タクシーを利用しましょう。バイクは必ずヘルメット着用。夜間は直感を信じて。",
    "safety.tip6.title": "健康",
    "safety.tip6.body": "経口補水塩、抗ヒスタミン、解熱鎮痛薬、絆創膏など基本キットを持参。ワクチン要件は6週間前にチェック。",
    "safety.advisory_title": "地域アドバイザリー一覧",
    "safety.badge.singapore": "シンガポール · 低",
    "safety.badge.japan": "日本 · 低",
    "safety.badge.south_korea": "韓国 · 低",
    "safety.badge.taiwan": "台湾 · 低",
    "safety.badge.australia": "オーストラリア · 低",
    "safety.badge.malaysia": "マレーシア · 中",
    "safety.badge.thailand": "タイ · 中",
    "safety.badge.vietnam": "ベトナム · 中",
    "safety.badge.indonesia": "インドネシア · 中",
    "safety.badge.hong_kong": "香港 · 中",
    "safety.badge.maldives": "モルディブ · 中",
    "enquiry.eyebrow": "// 送信",
    "enquiry.title": "行きたい場所を教えてください。",
    "enquiry.lede": "ご連絡先と希望をお寄せいただければ、旅程・費用・現地のヒントをまとめたカスタム提案をお送りします。",
    "enquiry.field.name": "氏名 *",
    "enquiry.field.email": "メールアドレス *",
    "enquiry.field.phone": "電話番号",
    "enquiry.field.destination": "気になる目的地",
    "enquiry.field.travel_date": "出発予定日",
    "enquiry.field.travellers": "人数",
    "enquiry.field.message": "メッセージ *",
    "enquiry.field.message_placeholder": "旅行の希望をお書きください — 興味・ペース・予算など...",
    "enquiry.submit_btn": "問い合わせを送信",
    "enquiry.other_option": "その他 / 提案を受け付ける",
    "enquiry.validation": "氏名、有効なメールアドレス、メッセージをご入力ください。",
    "enquiry.success_sent": "ありがとうございます！お問い合わせを送信しました — 24時間以内にご連絡します。",
    "enquiry.success_mailto": "ありがとうございます！メールクライアントが立ち上がりました — 送信ボタンを押してお届けください。",
    "enquiry.error_email": "ローカルに保存しましたが、メール送信に失敗しました。お手数ですが直接 {email} 宛にメールしてください。",
    "footer.tag": "私たちが行ったから、あなたの行き先がわかる。",
    "footer.note": "静的なデモサイトです。実際の予約は処理されません。",
    "modal.close_label": "ガイドを閉じる",
    "modal.latest_guide": "最新ガイド",
    "modal.flight": "フライト {value}",
    "modal.daily_from": "1日 {value} から",
    "modal.best_season": "ベストシーズン {value}",
    "modal.open_guide": "ガイドを開く",
    "modal.view_guide": "ガイドを見る",
    "modal.meta_line": "{country} · フライト {flight} · ベスト {season}",
    "modal.itinerary_heading": "おすすめ3日間プラン",
    "modal.food_heading": "並んででも食べたい料理",
    "modal.transport_heading": "移動手段",
    "modal.cost_heading": "費用の目安 (1人あたり3日間)",
    "modal.cost.Flights": "航空券",
    "modal.cost.Accommodation": "宿泊",
    "modal.cost.Food": "食事",
    "modal.cost.Transport": "現地交通",
    "modal.cost.Activities": "アクティビティ",
    "modal.cost.Total": "合計",
    "modal.safety_heading": "安全メモ",
    "modal.photos_heading": "ベスト撮影スポット",
    "city.flight": "フライト",
    "city.daily": "1日",
    "city.season": "シーズン",
  },
  ko: {
    "nav.home": "홈",
    "nav.guides": "가이드",
    "nav.cities": "도시",
    "nav.tools": "여행 도구",
    "nav.weather": "날씨",
    "nav.safety": "안전 정보",
    "nav.enquiry": "문의",
    "hero.eyebrow": "SYS:: TRAVEL_EXPLORER // v2.0 // 온라인",
    "hero.title": "우리가 다녀왔으니, 당신은 어디로 갈지 알 수 있어요.",
    "hero.sub": "현실적인 가격, 실제 일정, 공항 팁, 안전 노트, 날씨 인사이트, 현지 추천까지 담은 큐레이션 여행 가이드.",
    "hero.cta.guides": "최신 가이드 보기",
    "hero.cta.enquiry": "문의 보내기",
    "hero.readout.nodes": "거점",
    "hero.readout.uplink": "통신",
    "hero.scroll": "// 스크롤",
    "hero.scroll_label": "스크롤해서 둘러보기",
    "guides.eyebrow": "// 미션 브리핑",
    "guides.title": "진짜 가격, 진짜 일정, 군더더기 없음.",
    "guides.lede": "직접 비행기를 타고, 거리를 걷고, 골목 안 국숫집에서 먹어 본 뒤, 아시아·태평양에서 가장 사랑받는 12개 도시에 대한 솔직한 메모를 가져왔습니다.",
    "guides.stat.dossiers": "도시 자료",
    "guides.stat.days": "현지 체류일",
    "guides.stat.notes": "기록된 메모",
    "guides.stat.rarity": "희귀도",
    "tools.eyebrow": "// 장비",
    "tools.title": "탑승 전에 계획하세요.",
    "tools.budget.title": "여행 예산 계산기",
    "tools.budget.destination": "목적지",
    "tools.budget.travellers": "인원",
    "tools.budget.days": "일수",
    "tools.budget.daily": "1인 1일 예산 (SGD)",
    "tools.budget.result_label": "예상 총액",
    "tools.fx.title": "환율 변환기",
    "tools.fx.amount": "금액 (SGD)",
    "tools.fx.convert_to": "변환할 통화",
    "tools.fx.result_label": "약",
    "tools.fx.note": "참고용 정적 환율입니다. 운영 환경에서는 실시간 FX API로 교체하세요.",
    "tools.packing.title": "짐 싸기 체크리스트",
    "tools.packing.note": "체크 표시는 자동으로 저장됩니다.",
    "tools.itinerary.title": "일정 플래너",
    "tools.itinerary.day": "일차",
    "tools.itinerary.time": "시간",
    "tools.itinerary.activity": "활동",
    "tools.itinerary.activity_placeholder": "예: 마리나베이 가든 방문",
    "tools.itinerary.notes": "메모",
    "tools.itinerary.notes_placeholder": "티켓 미리 예매",
    "tools.itinerary.add_btn": "일정에 추가",
    "tools.itinerary.empty": "아직 항목이 없습니다 — 위에서 첫 활동을 추가하세요.",
    "tools.itinerary.remove": "삭제",
    "weather.eyebrow": "// 대기 스캔",
    "weather.title": "짐 싸기 전에 확인하세요.",
    "weather.placeholder": "도시명 입력 (예: Tokyo)",
    "weather.check_btn": "날씨 확인",
    "weather.checking": "{city}의 날씨를 확인 중…",
    "weather.humidity": "습도",
    "weather.wind": "풍속",
    "weather.feels_like": "체감",
    "weather.api_key_missing": "실시간 날씨를 사용하려면 app.js의 OpenWeather API 키를 설정하세요 (파일 상단 OPENWEATHER_API_KEY 수정).",
    "weather.city_not_found": "도시를 찾을 수 없습니다.",
    "weather.service_error": "날씨 서비스 응답: {status}.",
    "weather.network_error": "네트워크 오류 — 다시 시도해 주세요.",
    "safety.eyebrow": "// 위협 평가",
    "safety.title": "현명하게, 안전하게 여행하세요.",
    "safety.lede": "일반적인 권고 사항입니다 — 출발 전 반드시 자국 정부의 여행 경보도 확인하세요.",
    "safety.tip1.title": "여행자 보험",
    "safety.tip1.body": "포괄적인 보장을 꼭 가입하세요. 아시아에서 의료 후송 비용은 SGD 다섯 자리에 이를 수 있습니다.",
    "safety.tip2.title": "대사관 연락처",
    "safety.tip2.body": "대사관 주소와 비상 연락처를 오프라인으로 저장하세요. 출발 전 스크린샷을 찍어두세요.",
    "safety.tip3.title": "사기 주의",
    "safety.tip3.body": "미터기 택시를 이용하고, \"오늘 사원이 닫혔다\"는 툭툭 이야기는 피하세요. 소규모 호텔에 여권을 맡기지 마세요.",
    "safety.tip4.title": "물과 음식",
    "safety.tip4.body": "동남아에서는 생수나 정수만 드세요. 현지인이 줄 서는 곳에서 먹으면 회전이 빨라 신선합니다.",
    "safety.tip5.title": "교통",
    "safety.tip5.body": "Grab, Uber, 또는 정식 택시를 이용하세요. 오토바이는 무조건 헬멧 착용. 밤에는 직감을 믿으세요.",
    "safety.tip6.title": "건강",
    "safety.tip6.body": "기본 키트를 챙기세요: 경구 수액, 항히스타민, 진통제, 밴드. 백신 요건은 6주 전에 확인.",
    "safety.advisory_title": "지역별 권고 요약",
    "safety.badge.singapore": "싱가포르 · 낮음",
    "safety.badge.japan": "일본 · 낮음",
    "safety.badge.south_korea": "대한민국 · 낮음",
    "safety.badge.taiwan": "대만 · 낮음",
    "safety.badge.australia": "호주 · 낮음",
    "safety.badge.malaysia": "말레이시아 · 보통",
    "safety.badge.thailand": "태국 · 보통",
    "safety.badge.vietnam": "베트남 · 보통",
    "safety.badge.indonesia": "인도네시아 · 보통",
    "safety.badge.hong_kong": "홍콩 · 보통",
    "safety.badge.maldives": "몰디브 · 보통",
    "enquiry.eyebrow": "// 전송",
    "enquiry.title": "꿈꾸시는 여행지를 알려주세요.",
    "enquiry.lede": "정보를 남겨주시면 일정, 비용, 현지 팁이 포함된 맞춤 제안을 보내드립니다.",
    "enquiry.field.name": "이름 *",
    "enquiry.field.email": "이메일 *",
    "enquiry.field.phone": "전화번호",
    "enquiry.field.destination": "관심 목적지",
    "enquiry.field.travel_date": "출발 예정일",
    "enquiry.field.travellers": "여행 인원",
    "enquiry.field.message": "메시지 *",
    "enquiry.field.message_placeholder": "여행 계획을 알려주세요 — 관심사, 페이스, 예산 등...",
    "enquiry.submit_btn": "문의 보내기",
    "enquiry.other_option": "기타 / 추천을 받고 싶어요",
    "enquiry.validation": "이름, 유효한 이메일, 메시지를 입력해 주세요.",
    "enquiry.success_sent": "감사합니다! 문의가 전송되었습니다 — 24시간 내 회신드리겠습니다.",
    "enquiry.success_mailto": "감사합니다! 이메일 클라이언트가 열렸습니다 — 보내기 버튼을 눌러주세요.",
    "enquiry.error_email": "로컬에 저장했지만 이메일 전송이 실패했습니다. {email}으로 직접 이메일을 보내주세요.",
    "footer.tag": "우리가 다녀왔으니, 당신은 어디로 갈지 알 수 있어요.",
    "footer.note": "정적 데모 사이트입니다. 실제 예약은 처리되지 않습니다.",
    "modal.close_label": "가이드 닫기",
    "modal.latest_guide": "최신 가이드",
    "modal.flight": "비행 {value}",
    "modal.daily_from": "1일 {value}부터",
    "modal.best_season": "최적 시기 {value}",
    "modal.open_guide": "가이드 열기",
    "modal.view_guide": "가이드 보기",
    "modal.meta_line": "{country} · 비행 {flight} · 최적 {season}",
    "modal.itinerary_heading": "추천 3일 일정",
    "modal.food_heading": "줄 서서라도 먹을 만한 음식",
    "modal.transport_heading": "이동 수단",
    "modal.cost_heading": "예상 비용 (1인 기준 3일)",
    "modal.cost.Flights": "항공편",
    "modal.cost.Accommodation": "숙박",
    "modal.cost.Food": "식사",
    "modal.cost.Transport": "현지 교통",
    "modal.cost.Activities": "액티비티",
    "modal.cost.Total": "합계",
    "modal.safety_heading": "안전 메모",
    "modal.photos_heading": "추천 촬영 장소",
    "city.flight": "비행",
    "city.daily": "1일",
    "city.season": "시즌",
  },
};

/* =========================================================
 * City data (with localised fields)
 * Each translatable field is either a string (no localisation)
 * or { en, ja, ko }. Use loc() to read.
 * ========================================================= */

const CITIES = [
  {
    id: "seoul",
    name: { en: "Seoul", ja: "ソウル", ko: "서울" },
    country: { en: "South Korea", ja: "韓国", ko: "대한민국" },
    images: [
      "https://images.unsplash.com/photo-1538485399081-7c8970e15278?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1610715812875-d9f2bb1ae838?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Palace gates at dawn, neon alleys past midnight. Seoul moves at two speeds and you'll fall for both.",
      ja: "夜明けの宮殿の門と、深夜のネオン路地。二つのスピードで動くソウルは、どちらも好きになる街。",
      ko: "새벽 궁궐의 문, 한밤의 네온 골목. 두 가지 속도로 흐르는 서울, 어느 쪽이든 매력적입니다.",
    },
    flight: "6h 30m",
    daily: 150,
    season: { en: "Apr–May, Sep–Oct", ja: "4〜5月、9〜10月", ko: "4–5월, 9–10월" },
    overview: {
      en: "Seoul layers thousand-year palaces over hyper-modern districts. Spend mornings in Bukchon hanok lanes, afternoons in Gangnam cafés, and nights in Hongdae street food markets. English signage is good and the metro is world-class.",
      ja: "千年の宮殿と超近代的なエリアが重なり合う街、ソウル。午前は北村の韓屋の路地、午後は江南のカフェ、夜は弘大の屋台街へ。英語表記も整っていて、地下鉄は世界トップクラスです。",
      ko: "서울은 천년의 궁궐과 초현대적인 거리가 겹쳐 있는 도시입니다. 아침은 북촌 한옥 골목, 오후는 강남 카페, 밤은 홍대 포장마차 거리에서 보내세요. 영어 표지가 잘 되어 있고 지하철은 세계 최고 수준입니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Old Seoul", ja: "1日目 — 旧ソウル", ko: "1일차 — 옛 서울" },
        items: {
          en: ["Gyeongbokgung Palace + changing of the guard", "Bukchon Hanok Village walk", "Insadong tea house break", "Gwangjang Market dinner: bindaetteok + mayak gimbap"],
          ja: ["景福宮 + 守門将交代式", "北村韓屋村散策", "仁寺洞の茶房でひと休み", "広蔵市場の夕食: ピンデトッ + マヤクキンパ"],
          ko: ["경복궁 + 수문장 교대식", "북촌 한옥마을 산책", "인사동 찻집에서 휴식", "광장시장 저녁: 빈대떡 + 마약김밥"],
        },
      },
      {
        day: { en: "Day 2 — Modern Seoul", ja: "2日目 — 現代のソウル", ko: "2일차 — 현대 서울" },
        items: {
          en: ["Coffee in Seongsu (Korea's Brooklyn)", "Lotte Tower observation deck", "Gangnam shopping at Garosu-gil", "Han River sunset with chicken & beer"],
          ja: ["聖水洞でコーヒー (韓国のブルックリン)", "ロッテタワー展望台", "江南カロスキルでショッピング", "漢江の夕日とチメク (チキン+ビール)"],
          ko: ["성수동 카페 투어 (한국의 브루클린)", "롯데타워 전망대", "강남 가로수길 쇼핑", "한강 노을과 치맥 (치킨+맥주)"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["DMZ guided tour (book in advance)", "Or: Nami Island + Petite France", "Evening Korean BBQ in Hongdae", "Late-night noraebang (karaoke)"],
          ja: ["DMZガイドツアー (要事前予約)", "あるいは南怡島 + プチフランス", "夜は弘大で韓国式焼肉", "深夜のノレバン (カラオケ)"],
          ko: ["DMZ 가이드 투어 (사전 예약)", "또는 남이섬 + 쁘띠 프랑스", "저녁은 홍대 한국식 BBQ", "심야 노래방"],
        },
      },
    ],
    food: {
      en: ["Bossam (boiled pork wraps)", "Tteokbokki at Sindang-dong", "Korean fried chicken + Cass beer", "Naengmyeon in summer", "Soft tofu jjigae for breakfast"],
      ja: ["ポッサム (茹で豚の包み)", "新堂洞のトッポッキ", "韓国式フライドチキン + Cassビール", "夏の冷麺", "朝食にスンドゥブチゲ"],
      ko: ["보쌈", "신당동 떡볶이", "한국식 후라이드 치킨 + 카스 맥주", "여름의 냉면", "아침 식사로 순두부찌개"],
    },
    transport: {
      en: "T-money card works on subway, buses, and most taxis. Kakao T app for ride-hailing (Uber doesn't really exist here). Airport Express (AREX) from Incheon takes 43 min to Seoul Station.",
      ja: "T-moneyカードは地下鉄・バス・ほとんどのタクシーで使えます。配車はKakao Tアプリ (Uberはほぼありません)。仁川空港鉄道 (AREX) でソウル駅まで43分。",
      ko: "T-money 카드로 지하철, 버스, 대부분의 택시 이용 가능. 차량 호출은 카카오 T (이곳에선 Uber가 거의 없습니다). 인천공항철도 (AREX)로 서울역까지 43분.",
    },
    cost: { Flights: 600, Accommodation: 480, Food: 250, Transport: 60, Activities: 130 },
    safety: {
      en: ["Extremely safe at all hours. Solo travel is fine.", "Watch crowd density on weekends in Myeongdong and Hongdae.", "Tap water is technically potable but most locals drink bottled.", "Note: regional tensions don't affect daily travel — stay informed."],
      ja: ["24時間とても安全。一人旅も問題ありません。", "週末の明洞と弘大は人混みに注意。", "水道水は飲用可ですが、地元の人はボトル水を好みます。", "南北情勢は日常の旅行に影響しませんが、情報は確認を。"],
      ko: ["24시간 매우 안전합니다. 혼자 여행도 무난합니다.", "주말 명동과 홍대의 인파에 주의하세요.", "수돗물은 음용 가능하지만 현지인은 생수를 선호합니다.", "남북 정세는 일상 여행에 영향이 없지만 뉴스는 확인하세요."],
    },
    photoSpots: {
      en: ["Bukchon Hanok rooftops at 7am", "Cheonggyecheon stream at night", "N Seoul Tower from Namsan Park", "Ihwa Mural Village murals", "Banpo Bridge rainbow fountain"],
      ja: ["朝7時の北村韓屋の屋根", "夜の清渓川", "南山公園から見るNソウルタワー", "梨花壁画村の壁画", "盤浦大橋の月光レインボー噴水"],
      ko: ["오전 7시 북촌 한옥 지붕", "밤의 청계천", "남산공원에서 본 N서울타워", "이화벽화마을 벽화", "반포대교 무지개 분수"],
    },
  },
  {
    id: "singapore",
    name: { en: "Singapore", ja: "シンガポール", ko: "싱가포르" },
    country: { en: "Singapore", ja: "シンガポール", ko: "싱가포르" },
    images: [
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Hawker centres at lunch, cocktail bars in colonial shophouses at night. Compact, clean, and seriously delicious.",
      ja: "ランチはホーカーセンター、夜はコロニアル建築のショップハウスのバーへ。コンパクトで清潔、そして本当に美味しい街。",
      ko: "점심은 호커 센터, 밤은 콜로니얼 숍하우스의 칵테일 바. 작고 깨끗하고 정말 맛있는 도시.",
    },
    flight: "0h (home base)",
    daily: 120,
    season: { en: "Feb–Apr", ja: "2〜4月", ko: "2–4월" },
    overview: {
      en: "Singapore packs a continent of food and architecture into 720 sq km. You can morning-swim at Sentosa, lunch at a Michelin hawker stall, and dine at an Indian institution along Race Course Road. Everything connects by MRT.",
      ja: "720平方キロに大陸ぶんの食と建築を詰め込んだ都市。朝はセントーサで泳ぎ、昼はミシュラン屋台、夜はレースコース通りのインド料理店へ。すべてMRTで繋がっています。",
      ko: "720km²에 대륙 규모의 음식과 건축을 담은 도시. 아침엔 센토사에서 수영, 점심엔 미슐랭 호커, 저녁엔 레이스코스 로드의 인도 음식점. 모든 곳이 MRT로 연결됩니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Icons", ja: "1日目 — 名所", ko: "1일차 — 아이콘" },
        items: {
          en: ["Marina Bay Gardens (Cloud Forest + Flower Dome)", "Helix Bridge walk to MBS SkyPark", "Lau Pa Sat satay street dinner", "Spectra light show at Marina Bay"],
          ja: ["マリーナベイ・ガーデンズ (クラウドフォレスト + フラワードーム)", "ヘリックスブリッジを渡ってMBSスカイパークへ", "ラオパサのサテ屋台で夕食", "マリーナベイのSpectraライトショー"],
          ko: ["마리나베이 가든 (클라우드 포레스트 + 플라워 돔)", "헬릭스 브리지 도보로 MBS 스카이파크", "라우파삿 사테 거리 저녁", "마리나베이 스펙트라 라이트 쇼"],
        },
      },
      {
        day: { en: "Day 2 — Neighbourhoods", ja: "2日目 — 街めぐり", ko: "2일차 — 동네 탐방" },
        items: {
          en: ["Chinatown breakfast: kaya toast at Tong Ah", "Tiong Bahru's indie cafés and bookshops", "Haji Lane + Arab Street", "Maxwell Hawker: Tian Tian chicken rice"],
          ja: ["チャイナタウンで朝食: トンアーのカヤトースト", "ティオンバルのインディーカフェと書店", "ハジレーン + アラブストリート", "マックスウェル屋台のTian Tianチキンライス"],
          ko: ["차이나타운 아침: 통아의 카야 토스트", "티옹바루 인디 카페와 서점", "하지 레인 + 아랍 스트리트", "맥스웰 호커의 티엔티엔 치킨라이스"],
        },
      },
      {
        day: { en: "Day 3 — Green side", ja: "3日目 — 緑のサイド", ko: "3일차 — 자연" },
        items: {
          en: ["MacRitchie TreeTop Walk", "Singapore Botanic Gardens", "Dempsey Hill brunch", "Sunset rooftop at 1-Altitude or LeVeL33"],
          ja: ["マクリッチ・ツリートップウォーク", "シンガポール植物園", "デンプシーヒルでブランチ", "1-AltitudeまたはLeVeL33のルーフトップで夕日"],
          ko: ["맥리치 트리탑 워크", "싱가포르 식물원", "뎀시 힐 브런치", "1-Altitude 또는 LeVeL33 옥상에서 노을"],
        },
      },
    ],
    food: {
      en: ["Hainanese chicken rice", "Chilli crab at Jumbo or Long Beach", "Laksa at 328 Katong", "Char kway teow", "Roti prata with curry"],
      ja: ["海南チキンライス", "JumboまたはLong Beachのチリクラブ", "328カトンのラクサ", "チャー・クェイ・ティアウ", "ロティ・プラタとカレー"],
      ko: ["하이난식 치킨라이스", "점보 또는 롱비치 칠리크랩", "328 카통의 락사", "차 콰이 티아우", "로티 프라타와 카레"],
    },
    transport: {
      en: "EZ-Link or contactless credit card on MRT and buses. Grab is the dominant ride-hailing app. Changi to city: 30 min by MRT, ~SGD 25 by Grab.",
      ja: "EZ-Linkカードか非接触クレジットカードでMRT・バス利用可。配車はGrabが定番。チャンギ空港から市街地まではMRTで約30分、Grabで約SGD 25。",
      ko: "EZ-Link 또는 비접촉 신용카드로 MRT와 버스 이용. 차량 호출은 Grab이 주류. 창이공항에서 시내까지 MRT 30분, Grab은 약 SGD 25.",
    },
    cost: { Flights: 0, Accommodation: 600, Food: 200, Transport: 50, Activities: 150 },
    safety: {
      en: ["One of the safest cities globally. Walk anywhere, any time.", "Laws are strict — no littering, no chewing gum (mostly), no jaywalking.", "Tap water is clean and safe to drink.", "Watch for cyclists and PMDs on shared paths."],
      ja: ["世界でもトップクラスに安全。いつでもどこでも歩けます。", "法律は厳格 — ポイ捨て・ガム持込・横断禁止に注意。", "水道水はそのまま飲めます。", "シェア道では自転車とPMD (電動キックボード) に注意。"],
      ko: ["세계에서 가장 안전한 도시 중 하나. 언제 어디든 걸어다닐 수 있습니다.", "법이 엄격 — 쓰레기 투기, 껌, 무단횡단 금지.", "수돗물은 그대로 마실 수 있습니다.", "공유 도로에서 자전거와 PMD를 조심하세요."],
    },
    photoSpots: {
      en: ["Marina Bay Sands reflected in the bay at blue hour", "Helix Bridge geometry shots", "Peranakan shophouses on Koon Seng Road", "Old Hill Street Police Station rainbow windows", "Henderson Waves bridge"],
      ja: ["ブルーアワーに湾に映るマリーナベイサンズ", "ヘリックスブリッジの幾何学", "クーンセン通りのプラナカン・ショップハウス", "オールド・ヒル・ストリート警察署のレインボー窓", "ヘンダーソン・ウェーブス橋"],
      ko: ["블루아워의 만에 비친 마리나베이샌즈", "헬릭스 브리지의 기하학적 샷", "쿤셍 로드의 페라나칸 숍하우스", "올드 힐 스트리트 경찰서 무지개 창문", "헨더슨 웨이브 다리"],
    },
  },
  {
    id: "bali",
    name: { en: "Bali", ja: "バリ島", ko: "발리" },
    country: { en: "Indonesia", ja: "インドネシア", ko: "인도네시아" },
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1554366347-897a5113f6ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Rice terraces, surf breaks, temple ceremonies. Stay long enough to slow down.",
      ja: "棚田、サーフブレイク、寺院の儀式。ゆっくり過ごせるだけ滞在を。",
      ko: "계단식 논, 서핑 포인트, 사원 의식. 천천히 흐를 만큼 오래 머물러 보세요.",
    },
    flight: "2h 30m",
    daily: 80,
    season: { en: "May–Sep", ja: "5〜9月", ko: "5–9월" },
    overview: {
      en: "Ubud for the jungle and yoga, Canggu for surf and cafés, Uluwatu for the cliff sunsets, Nusa Penida for the wild day trips. Hire a scooter or a private driver for the day — a full-day driver runs SGD 50–70.",
      ja: "ジャングルとヨガのウブド、サーフとカフェのチャングー、断崖の夕日のウルワツ、ワイルドな日帰り先のヌサ・ペニダ。スクーターか専属ドライバーが便利 — 1日チャーターでSGD 50〜70。",
      ko: "정글과 요가는 우붓, 서핑과 카페는 짱구, 절벽 노을은 울루와뚜, 야성의 당일치기는 누사 페니다. 스쿠터나 전속 기사를 이용하세요 — 1일 기사 약 SGD 50–70.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Ubud", ja: "1日目 — ウブド", ko: "1일차 — 우붓" },
        items: {
          en: ["Tegalalang rice terraces at sunrise", "Sacred Monkey Forest walk", "Lunch at Hujan Locale or Locavore To Go", "Sunset at Campuhan Ridge Walk"],
          ja: ["日の出のテガラランの棚田", "聖なるモンキーフォレスト散策", "Hujan LocaleまたはLocavore To Goでランチ", "チャンプアン尾根ウォークで夕日"],
          ko: ["일출의 트갈랄랑 계단식 논", "성스러운 원숭이 숲 산책", "후잔 로칼레 또는 로카보어 투 고에서 점심", "캄푸한 능선 산책로에서 노을"],
        },
      },
      {
        day: { en: "Day 2 — South coast", ja: "2日目 — 南海岸", ko: "2일차 — 남해안" },
        items: {
          en: ["Surf lesson in Canggu", "Lunch at La Brisa or The Lawn", "Uluwatu Temple at sunset", "Kecak fire dance + Jimbaran seafood dinner"],
          ja: ["チャングーでサーフレッスン", "La BrisaまたはThe Lawnでランチ", "夕暮れのウルワツ寺院", "ケチャ・ファイアダンス + ジンバランで海鮮ディナー"],
          ko: ["짱구에서 서핑 레슨", "라 브리사 또는 더 론에서 점심", "노을의 울루와뚜 사원", "케착 댄스 + 짐바란 해산물 디너"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["Nusa Penida full-day boat tour", "Kelingking Beach viewpoint", "Angel's Billabong + Broken Beach", "Crystal Bay swim & snorkel"],
          ja: ["ヌサ・ペニダ1日ボートツアー", "クリンキン・ビーチ展望台", "エンジェルズ・ビラボン + ブロークン・ビーチ", "クリスタル・ベイで遊泳とシュノーケル"],
          ko: ["누사 페니다 종일 보트 투어", "클링킹 비치 전망대", "엔젤스 빌라봉 + 브로큰 비치", "크리스털 베이 수영과 스노클링"],
        },
      },
    ],
    food: {
      en: ["Babi guling (suckling pig) at Ibu Oka", "Nasi campur — order one of everything", "Bebek betutu (slow-roasted duck)", "Sate lilit (Balinese satay)", "Fresh young coconut everywhere"],
      ja: ["イブ・オカのバビ・グリン (子豚の丸焼き)", "ナシ・チャンプル — 全種類盛り", "ベベ・ベトゥトゥ (アヒルのスロー焼き)", "サテ・リリ (バリ風サテ)", "どこでも飲める新鮮なヤシの実"],
      ko: ["이부 오까의 바비 굴링 (새끼돼지 통구이)", "나시 짬뿌르 — 한 입씩 다 주문", "베벡 베투투 (오리 슬로우로스트)", "사테 릴릿 (발리식 사테)", "어디서나 신선한 어린 코코넛"],
    },
    transport: {
      en: "Bali has no metro. Hire a driver (SGD 50–70/day) or a scooter (SGD 8/day) if confident. Gojek and Grab work in most areas but get blocked from some taxi turfs. Allow 90+ min between Canggu and Uluwatu.",
      ja: "バリには地下鉄がありません。ドライバー雇用 (1日SGD 50〜70) か、自信があればスクーター (1日SGD 8) で移動。GojekとGrabはほぼ使えますが、一部タクシー縄張りでは利用不可。チャングーからウルワツへは90分以上見込みを。",
      ko: "발리에는 지하철이 없습니다. 기사 고용 (1일 SGD 50–70) 또는 능숙하다면 스쿠터 (1일 SGD 8). Gojek과 Grab은 대부분 작동하지만 일부 택시 구역에서 차단됩니다. 짱구–울루와뚜는 90분 이상 잡으세요.",
    },
    cost: { Flights: 350, Accommodation: 280, Food: 150, Transport: 100, Activities: 120 },
    safety: {
      en: ["Watch the surf — strong rips at Kuta, Canggu, and Padang Padang.", "Scooter accidents are the #1 traveller injury. Wear a helmet, full sleeves.", "Drink bottled water only. Brush teeth with it too.", "Monkeys at Uluwatu and Ubud will steal sunglasses — don't engage."],
      ja: ["波に注意 — クタ、チャングー、パダンパダンは離岸流が強い。", "スクーター事故は旅行者の怪我No.1。ヘルメットと長袖を。", "水はボトル水のみ。歯磨きにも使いましょう。", "ウルワツとウブドの猿はサングラスを奪います — 関わらないこと。"],
      ko: ["파도 주의 — 쿠타, 짱구, 파당파당은 이안류가 강합니다.", "스쿠터 사고가 여행자 부상 1위. 헬멧과 긴소매를 착용하세요.", "생수만 마시고 양치할 때도 사용하세요.", "울루와뚜와 우붓의 원숭이는 선글라스를 훔쳐갑니다 — 가까이 가지 마세요."],
    },
    photoSpots: {
      en: ["Handara Gate", "Tegalalang rice terraces", "Tibumana Waterfall", "Lempuyang Temple 'Gates of Heaven'", "Kelingking Beach cliff"],
      ja: ["ハンダラ・ゲート", "テガラランの棚田", "ティブマナの滝", "ルンプヤン寺院「天国の門」", "クリンキン・ビーチの断崖"],
      ko: ["한다라 게이트", "트갈랄랑 계단식 논", "티부마나 폭포", "름뿌양 사원 '천국의 문'", "클링킹 비치 절벽"],
    },
  },
  {
    id: "tokyo",
    name: { en: "Tokyo", ja: "東京", ko: "도쿄" },
    country: { en: "Japan", ja: "日本", ko: "일본" },
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "13 million people, zero chaos. The world's most considerate megacity.",
      ja: "1,300万人がいて混沌ゼロ。世界一マナーの良いメガシティ。",
      ko: "1,300만 명, 무질서 제로. 세계에서 가장 배려 깊은 거대도시.",
    },
    flight: "7h 00m",
    daily: 180,
    season: { en: "Mar–May, Oct–Nov", ja: "3〜5月、10〜11月", ko: "3–5월, 10–11월" },
    overview: {
      en: "Tokyo rewards curiosity. Get lost on purpose in Shimokitazawa, then surface in Ginza for dinner. Cash is still king at small shops — keep ¥20,000 on you. The JR Yamanote line loops every major district.",
      ja: "好奇心が報われる街、東京。下北沢でわざと迷い、夜は銀座で食事。小さな店では今も現金が主役 — ¥20,000は手元に。JR山手線が主要エリアをすべて環状でつなぎます。",
      ko: "호기심에 보답하는 도시, 도쿄. 시모키타자와에서 일부러 길을 잃고 저녁엔 긴자로. 작은 가게는 여전히 현금이 왕 — 2만 엔은 챙기세요. JR 야마노테선이 주요 구역을 환상으로 연결합니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Central", ja: "1日目 — 都心", ko: "1일차 — 도심" },
        items: {
          en: ["Tsukiji Outer Market breakfast", "Imperial Palace gardens", "Ginza for window-shopping and sushi", "Roppongi Hills observation deck at dusk"],
          ja: ["築地場外市場で朝食", "皇居外苑", "銀座でウィンドウショッピングと寿司", "夕暮れの六本木ヒルズ展望台"],
          ko: ["츠키지 장외시장 아침", "왕궁 정원", "긴자에서 윈도쇼핑과 스시", "해질녘 롯폰기 힐스 전망대"],
        },
      },
      {
        day: { en: "Day 2 — Pop & quirky", ja: "2日目 — ポップ&個性派", ko: "2일차 — 팝 & 개성" },
        items: {
          en: ["Meiji Shrine morning walk", "Harajuku + Omotesando cafés", "Shibuya Crossing and Shibuya Sky", "Golden Gai tiny-bar crawl"],
          ja: ["明治神宮の朝散歩", "原宿 + 表参道カフェ", "渋谷スクランブル交差点と渋谷スカイ", "ゴールデン街で小さなバー巡り"],
          ko: ["메이지 신궁 아침 산책", "하라주쿠 + 오모테산도 카페", "시부야 스크램블과 시부야 스카이", "골든가이 소형 바 투어"],
        },
      },
      {
        day: { en: "Day 3 — Old town", ja: "3日目 — 下町", ko: "3일차 — 옛 동네" },
        items: {
          en: ["Senso-ji Temple in Asakusa at 7am", "Yanaka old neighbourhood walk", "Akihabara electronics + retro arcades", "Robot Restaurant or izakaya in Ebisu"],
          ja: ["朝7時の浅草・浅草寺", "谷中の下町散策", "秋葉原で電気街とレトロゲーセン", "ロボットレストランか恵比寿の居酒屋"],
          ko: ["오전 7시 아사쿠사 센소지", "야나카 옛 동네 산책", "아키하바라 전자상가와 레트로 아케이드", "로봇 레스토랑 또는 에비스 이자카야"],
        },
      },
    ],
    food: {
      en: ["Conveyor-belt sushi at Uobei", "Ichiran or Afuri ramen", "Tonkatsu at Maisen", "Wagyu yakiniku at Han no Daidokoro", "Convenience store onigiri — actually amazing"],
      ja: ["魚べいの回転寿司", "一蘭またはAFURIのラーメン", "まい泉のとんかつ", "叙々苑系焼肉「韓の台所」", "コンビニのおにぎり — 本当に美味"],
      ko: ["우오베이 회전초밥", "이치란 또는 아후리 라멘", "마이센 돈카츠", "한노다이도코로 와규 야키니쿠", "편의점 오니기리 — 진짜 맛있음"],
    },
    transport: {
      en: "Suica or Pasmo card on every train, bus, and many vending machines. JR Pass only worth it if doing Kyoto/Osaka. Narita to city: 60–90 min by N'EX; Haneda: 30 min by Tokyo Monorail.",
      ja: "SuicaまたはPasmoは電車・バス・多くの自販機で使えます。JR Passは京都・大阪まで行く場合のみお得。成田から都心はN'EXで60〜90分、羽田は東京モノレールで30分。",
      ko: "Suica 또는 Pasmo로 모든 전철, 버스, 자판기 이용. JR 패스는 교토·오사카까지 갈 때만 본전. 나리타→도심 N'EX로 60–90분, 하네다는 도쿄 모노레일 30분.",
    },
    cost: { Flights: 700, Accommodation: 700, Food: 350, Transport: 90, Activities: 160 },
    safety: {
      en: ["Astonishingly safe. Drop your wallet — someone hands it back.", "Earthquake drills are routine; download the Yurekuru Call app.", "Mind the silent train etiquette — no phone calls.", "Late-night Kabukicho touts: ignore and walk on."],
      ja: ["驚くほど安全。財布を落としても返ってきます。", "地震訓練は日常 — 「ゆれくるコール」アプリを入れておきましょう。", "電車内のマナーに注意 — 通話は控えること。", "深夜の歌舞伎町キャッチ: 無視して通り過ぎましょう。"],
      ko: ["놀랄 만큼 안전합니다. 지갑을 떨어뜨려도 돌려받습니다.", "지진 훈련이 일상 — '유레쿠루 콜' 앱을 설치하세요.", "전철 내 정숙 매너 — 통화 금지.", "심야 가부키쵸 호객꾼은 무시하고 지나가세요."],
    },
    photoSpots: {
      en: ["Shibuya Crossing from Shibuya Sky", "Mt Fuji from Lake Kawaguchi (day trip)", "Senso-ji at night, empty", "Hot pink azaleas at Nezu Shrine (spring)", "Tokyo Tower from Roppongi Hills"],
      ja: ["渋谷スカイから見るスクランブル交差点", "河口湖から望む富士山 (日帰り)", "夜・人のいない浅草寺", "根津神社のツツジ (春)", "六本木ヒルズから見る東京タワー"],
      ko: ["시부야 스카이에서 본 스크램블 교차로", "가와구치 호수에서 본 후지산 (당일치기)", "밤의 인적 없는 센소지", "네즈 신사 진달래 (봄)", "롯폰기 힐스에서 본 도쿄타워"],
    },
  },
  {
    id: "bangkok",
    name: { en: "Bangkok", ja: "バンコク", ko: "방콕" },
    country: { en: "Thailand", ja: "タイ", ko: "태국" },
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1552550049-db097c9480d1?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Temple-and-mall in the same afternoon. Bangkok is loud, generous, and outstanding value.",
      ja: "同じ午後に寺院もモールも。バンコクは賑やかで気前がよく、圧倒的なコスパ。",
      ko: "오후 한나절에 사원과 쇼핑몰을 다. 방콕은 시끄럽고 후하고 가성비가 압도적입니다.",
    },
    flight: "2h 30m",
    daily: 70,
    season: { en: "Nov–Feb", ja: "11〜2月", ko: "11–2월" },
    overview: {
      en: "Bangkok is two cities — the river side (Grand Palace, Wat Pho, Chinatown) and the new side (Sukhumvit, Thonglor, Asok). The BTS Skytrain and MRT cover most of what you want; tuk-tuks are tourist tax. Always agree on a taxi meter.",
      ja: "バンコクは二つの街 — 川岸 (王宮、ワット・ポー、チャイナタウン) と新市街 (スクンビット、トンロー、アソーク)。BTSとMRTで大半をカバー、トゥクトゥクは観光客価格。タクシーは必ずメーターを。",
      ko: "방콕은 두 도시 — 강변 (왕궁, 왓 포, 차이나타운)과 새로운 쪽 (수쿰빗, 통로, 아속). BTS 스카이트레인과 MRT가 대부분을 커버, 툭툭은 관광객 가격. 택시는 무조건 미터.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Old town", ja: "1日目 — 旧市街", ko: "1일차 — 구시가" },
        items: {
          en: ["Grand Palace + Wat Phra Kaew (long sleeves!)", "Wat Pho reclining Buddha + Thai massage", "Cross-river ferry to Wat Arun", "Chinatown street food crawl on Yaowarat"],
          ja: ["王宮 + ワット・プラケオ (長袖必須!)", "ワット・ポーの寝釈迦像 + タイ式マッサージ", "渡し船でワット・アルンへ", "ヤワラート通りのチャイナタウン屋台巡り"],
          ko: ["왕궁 + 왓 프라깨오 (긴소매 필수!)", "왓 포 와불 + 타이 마사지", "도하선으로 왓 아룬", "야와랏 거리 차이나타운 길거리 음식"],
        },
      },
      {
        day: { en: "Day 2 — Markets & mall life", ja: "2日目 — 市場とモール", ko: "2일차 — 시장과 쇼핑몰" },
        items: {
          en: ["Chatuchak Weekend Market (Sat/Sun only)", "Or Or Tor Kor for premium food", "MBK Center + Siam Paragon", "Rooftop drinks at Vertigo or Sky Bar"],
          ja: ["チャトゥチャック・ウィークエンド・マーケット (土日のみ)", "高級食材市場オー・トー・コー", "MBKセンター + サイアム・パラゴン", "VertigoまたはSky Barのルーフトップで一杯"],
          ko: ["짜뚜짝 주말시장 (토·일만)", "고급 식자재 시장 오 또 꼬", "MBK 센터 + 시암 파라곤", "베르티고 또는 스카이바 옥상에서 한 잔"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["Ayutthaya temple ruins (1.5h by train)", "Or: Maeklong railway market + Damnoen Saduak floating", "Evening cooking class", "Muay Thai at Lumpinee Stadium"],
          ja: ["アユタヤの寺院遺跡 (鉄道1.5時間)", "またはメークロン線路市場 + ダムヌン・サドゥアク水上市場", "夜は料理教室", "ルンピニー・スタジアムでムエタイ観戦"],
          ko: ["아유타야 사원 유적 (기차 1.5시간)", "또는 매끌렁 철도 시장 + 담넌사두악 수상시장", "저녁 요리 클래스", "룸피니 스타디움 무에타이 관람"],
        },
      },
    ],
    food: {
      en: ["Boat noodles in Victory Monument", "Som tam (papaya salad) with sticky rice", "Pad kra pao moo with fried egg", "Mango sticky rice from a cart", "Khao soi in the north — also found in Bangkok"],
      ja: ["戦勝記念塔のボートヌードル", "ソムタム (パパイヤサラダ) ともち米", "パッ・カパオ・ムー (豚バジル炒め) と目玉焼き", "屋台のマンゴーもち米", "北部料理カオソーイ (バンコクでも食べられる)"],
      ko: ["전승기념탑 보트누들", "솜땀 (파파야 샐러드)과 찰밥", "팟까파오무 (돼지 바질볶음)와 계란프라이", "노점 망고 스티키 라이스", "북부 음식 카오소이 (방콕에도 있음)"],
    },
    transport: {
      en: "BTS + MRT Rabbit card for skytrain/subway. Grab and Bolt both work. Don't tuk-tuk a long distance — they overcharge tourists. Suvarnabhumi to city: Airport Rail Link, 30 min.",
      ja: "BTSとMRTはRabbitカードで。GrabとBoltどちらも使えます。長距離のトゥクトゥクは避ける — 観光客向けにぼったくり。スワンナプーム空港から市街地はエアポート・レール・リンクで30分。",
      ko: "BTS와 MRT는 Rabbit 카드. Grab과 Bolt 모두 사용 가능. 장거리 툭툭은 피하세요 — 관광객 가격 바가지. 수완나품 공항에서 시내는 에어포트 레일 링크 30분.",
    },
    cost: { Flights: 250, Accommodation: 200, Food: 100, Transport: 50, Activities: 80 },
    safety: {
      en: ["Petty scams more than violence. 'Temple is closed today' = scam.", "Use only marked taxis and insist on the meter.", "Watch your drink in Khao San area.", "Air quality is poor Jan–Apr — pack an N95 if asthmatic."],
      ja: ["暴力よりプチ詐欺。「今日は寺院が閉まっている」は詐欺の合図。", "正規タクシーのみ利用しメーターを必須に。", "カオサン通りでは飲み物から目を離さないこと。", "1〜4月は大気汚染がひどい — 喘息ならN95を持参。"],
      ko: ["폭력보다 잔돈 사기. \"오늘 사원이 닫혔다\"는 사기 신호.", "정식 택시만 이용하고 미터기 사용을 요구하세요.", "카오산 거리에서 음료를 잠시도 두지 마세요.", "1–4월 대기질이 나쁨 — 천식 있으면 N95 챙기세요."],
    },
    photoSpots: {
      en: ["Wat Arun from across the river at sunset", "Wat Pho's reclining feet", "Skybar at Lebua", "Chinatown neon signs after 8pm", "Bangkok skyline from Mahanakhon SkyWalk"],
      ja: ["対岸から夕日のワット・アルン", "ワット・ポー寝釈迦の足", "ルブアのSky Bar", "夜8時以降のチャイナタウンのネオン", "マハナコン・スカイウォークから見るスカイライン"],
      ko: ["석양의 강 건너 왓 아룬", "왓 포 와불의 발바닥", "르부아의 스카이바", "저녁 8시 이후 차이나타운 네온", "마하나콘 스카이워크에서 본 방콕 스카이라인"],
    },
  },
  {
    id: "hong-kong",
    name: { en: "Hong Kong", ja: "香港", ko: "홍콩" },
    country: { en: "China SAR", ja: "中国特別行政区", ko: "중국 특별행정구" },
    images: [
      "https://images.unsplash.com/photo-1506372023823-741c83b836fe?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Skyscrapers wedged against jungle. The city compresses density and quiet into the same metro stop.",
      ja: "高層ビルとジャングルが隣り合う街。同じ駅で密集と静けさが共存。",
      ko: "마천루와 정글이 맞닿은 도시. 같은 역에서 밀도와 고요가 공존합니다.",
    },
    flight: "4h 00m",
    daily: 160,
    season: { en: "Oct–Dec", ja: "10〜12月", ko: "10–12월" },
    overview: {
      en: "Hong Kong does dim sum brunch, Victoria Peak views, hiking in Sai Kung, and Cantonese cocktail bars — all in one weekend. The MTR runs to nearly everywhere. Octopus card is your friend.",
      ja: "週末ひとつで飲茶ブランチ、ビクトリアピークの絶景、サイクンでのハイキング、広東風カクテルバー。MTRはほぼどこでも行けます。オクトパス・カードは強い味方。",
      ko: "주말 한 번에 딤섬 브런치, 빅토리아 피크 야경, 사이쿵 하이킹, 광동식 칵테일 바까지. MTR이 거의 모든 곳을 커버. 옥토퍼스 카드가 최고의 친구.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Island", ja: "1日目 — 香港島", ko: "1일차 — 홍콩섬" },
        items: {
          en: ["Yum cha at Lin Heung Tea House", "Tram up to Victoria Peak", "Hollywood Road galleries + PMQ", "Lan Kwai Fong nightlife"],
          ja: ["蓮香樓で飲茶", "トラムでビクトリアピークへ", "ハリウッド・ロードのギャラリー + PMQ", "ランカイフォンでナイトライフ"],
          ko: ["린향러우 얌차", "트램으로 빅토리아 피크", "할리우드 로드 갤러리 + PMQ", "란콰이퐁 나이트라이프"],
        },
      },
      {
        day: { en: "Day 2 — Kowloon", ja: "2日目 — 九龍", ko: "2일차 — 카오룽" },
        items: {
          en: ["Star Ferry across to Tsim Sha Tsui", "Avenue of Stars + Symphony of Lights", "Temple Street Night Market dinner", "Late-night noodles at Mak's"],
          ja: ["スターフェリーで尖沙咀へ", "アベニュー・オブ・スターズ + シンフォニー・オブ・ライツ", "テンプル・ストリート夜市で夕食", "深夜の麦奀でワンタン麺"],
          ko: ["스타페리로 침사추이", "스타의 거리 + 심포니 오브 라이트", "템플 스트리트 야시장 저녁", "야심한 막스 누들"],
        },
      },
      {
        day: { en: "Day 3 — Outdoors", ja: "3日目 — アウトドア", ko: "3일차 — 야외" },
        items: {
          en: ["Dragon's Back hike (3 hours)", "Shek O village + beach lunch", "Or: ferry to Lamma Island for seafood", "Sunset cocktails at Ozone (highest bar in the world)"],
          ja: ["ドラゴンズ・バック・トレイル (3時間)", "石澳村 + ビーチでランチ", "またはラマ島へフェリーで海鮮", "夕日のOzoneでカクテル (世界一高いバー)"],
          ko: ["드래곤스 백 하이킹 (3시간)", "석오 마을 + 비치 점심", "또는 라마섬 페리로 해산물", "오존 바에서 노을 칵테일 (세계 최고 높이)"],
        },
      },
    ],
    food: {
      en: ["Wonton noodles at Mak's", "Char siu rice at Joy Hing", "Egg tarts at Tai Cheong Bakery", "Hot pot in winter", "Dai pai dong stir-fry on Stanley Street"],
      ja: ["麦奀のワンタン麺", "再興燒臘飯店のチャーシュー飯", "泰昌餅家のエッグタルト", "冬の火鍋", "士丹利街の大牌檔の炒め物"],
      ko: ["막스 운탕면", "조이힝의 차슈밥", "타이청 베이커리의 에그타르트", "겨울 훠궈", "스탠리 거리 다이파이동 볶음"],
    },
    transport: {
      en: "Octopus card on MTR, buses, ferries, trams. Airport Express: 24 min to Central. Star Ferry crossings cost almost nothing and are iconic.",
      ja: "オクトパス・カードでMTR・バス・フェリー・トラム。エアポート・エクスプレスでセントラルまで24分。スターフェリーはほぼ無料同然で象徴的。",
      ko: "옥토퍼스 카드로 MTR, 버스, 페리, 트램. 에어포트 익스프레스로 센트럴까지 24분. 스타페리는 거의 공짜 수준이며 상징적입니다.",
    },
    cost: { Flights: 450, Accommodation: 650, Food: 230, Transport: 70, Activities: 100 },
    safety: {
      en: ["Generally very safe. Pickpockets in Mong Kok crowds.", "Public order rules tightened post-2020 — avoid demonstrations.", "Summer typhoons (T8+) shut the city down — check signals.", "Humidity is brutal May–Sep. Hydrate."],
      ja: ["全般に非常に安全。旺角の人混みではスリに注意。", "2020年以降は公的秩序の規制が強化 — デモは避けて。", "夏のT8以上の台風で都市機能停止 — 警報を確認。", "5〜9月は湿度がきつい。水分補給を。"],
      ko: ["전반적으로 매우 안전. 몽콕 인파에서 소매치기 주의.", "2020년 이후 공공질서 규제 강화 — 시위는 피하세요.", "여름 태풍 T8 이상이면 도시 기능 정지 — 신호 확인.", "5–9월 습도가 혹독. 수분 보충 필수."],
    },
    photoSpots: {
      en: ["Victoria Harbour from Tsim Sha Tsui promenade", "Choi Hung Estate rainbow basketball court", "Quarry Bay 'Monster Building'", "Tian Tan Buddha on Lantau", "Tram window shot through Wan Chai"],
      ja: ["尖沙咀プロムナードからのビクトリア・ハーバー", "彩虹邨のレインボー・バスケコート", "鰂魚涌「モンスター・ビルディング」", "ランタオ島の天壇大仏", "湾仔を走るトラムの窓からのショット"],
      ko: ["침사추이 산책로에서 본 빅토리아 하버", "초이훙 에스테이트 무지개 농구장", "쿼리베이 '몬스터 빌딩'", "란타우 섬 빅 부다", "완차이를 지나는 트램 창문 샷"],
    },
  },
  {
    id: "kuala-lumpur",
    name: { en: "Kuala Lumpur", ja: "クアラルンプール", ko: "쿠알라룸푸르" },
    country: { en: "Malaysia", ja: "マレーシア", ko: "말레이시아" },
    images: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "The easiest weekend trip from Singapore. Eat your way through it.",
      ja: "シンガポールから最も気軽な週末旅。とにかく食べ歩こう。",
      ko: "싱가포르에서 가장 쉬운 주말 여행. 그저 먹으며 다니세요.",
    },
    flight: "1h 00m",
    daily: 80,
    season: { en: "May–Jul", ja: "5〜7月", ko: "5–7월" },
    overview: {
      en: "KL is built for grazing. Hawker breakfasts in Pudu, banana leaf lunch in Bangsar, mall-hopping in Bukit Bintang, and a late-night supper in Jalan Alor. The Petronas Towers still impress in person.",
      ja: "KLは食べ歩きのための街。プドゥの屋台で朝食、バンサーでバナナリーフ・ランチ、ブキッ・ビンタンでモール巡り、ジャラン・アロールで深夜飯。ペトロナス・タワーは実物の迫力が今も健在。",
      ko: "KL은 먹방을 위한 도시. 푸두 호커 아침, 방사르 바나나리프 점심, 부킷빈탕 쇼핑몰, 잘란 알로르 야식. 페트로나스 타워는 실물도 여전히 압권입니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Classic KL", ja: "1日目 — 定番のKL", ko: "1일차 — 클래식 KL" },
        items: {
          en: ["Petronas Towers Skybridge (book online)", "KLCC Park morning walk", "Aquaria KLCC if it rains", "Jalan Alor street food dinner"],
          ja: ["ペトロナス・ツインタワーのスカイブリッジ (オンライン予約)", "KLCC公園で朝の散歩", "雨ならアクアリアKLCC", "ジャラン・アロールの屋台で夕食"],
          ko: ["페트로나스 트윈타워 스카이브릿지 (온라인 예약)", "KLCC 공원 아침 산책", "비 오면 아쿠아리아 KLCC", "잘란 알로르 길거리 음식 저녁"],
        },
      },
      {
        day: { en: "Day 2 — Heritage", ja: "2日目 — ヘリテージ", ko: "2일차 — 헤리티지" },
        items: {
          en: ["Batu Caves before 10am (avoid heat)", "Sri Mahamariamman Temple", "Central Market + Kasturi Walk", "Heli Lounge Bar rooftop sunset"],
          ja: ["朝10時前のバトゥ洞窟 (暑さ回避)", "スリ・マハマリアマン寺院", "セントラル・マーケット + カストゥリ・ウォーク", "ヘリ・ラウンジ・バーで夕日"],
          ko: ["오전 10시 전 바투 동굴 (더위 피하기)", "스리 마하마리암만 사원", "센트럴 마켓 + 카스투리 워크", "헬리 라운지 바 옥상 노을"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["Genting Highlands cable car + theme park", "Or: Putrajaya mosque architecture tour", "Late banana leaf lunch in Bangsar", "Bukit Bintang night market"],
          ja: ["ゲンティン・ハイランズのケーブルカー + テーマパーク", "またはプトラジャヤのモスク建築ツアー", "遅めのバンサーでバナナリーフ・ランチ", "ブキッ・ビンタンのナイトマーケット"],
          ko: ["겐팅 하이랜드 케이블카 + 테마파크", "또는 푸트라자야 모스크 건축 투어", "방사르에서 늦은 바나나리프 점심", "부킷빈탕 야시장"],
        },
      },
    ],
    food: {
      en: ["Nasi lemak at Village Park", "Char kway teow at Sister's, Imbi Market", "Banana leaf rice at Raj's", "Cendol + ais kacang for dessert", "Roti canai any time of day"],
      ja: ["ヴィレッジ・パークのナシ・レマ", "インビ・マーケットSister'sのチャー・クェイ・ティアウ", "Raj'sのバナナリーフ・ライス", "デザートにチェンドル + アイス・カチャン", "いつでもロティ・チャナイ"],
      ko: ["빌리지 파크의 나시 르막", "임비 마켓 시스터스의 차 콰이 티아우", "라즈의 바나나리프 라이스", "디저트로 첸돌 + 아이스 카창", "언제든 로띠 짜나이"],
    },
    transport: {
      en: "Grab is everywhere and cheap. KLIA Ekspres: 33 min to KL Sentral. MRT/LRT covers most touristy areas. Beware of jam — leave 90 min for cross-city.",
      ja: "Grabはどこでも安い。KLIAエクスプレスでKLセントラル駅まで33分。MRT/LRTで観光エリアの大半をカバー。渋滞注意 — 横断に90分は見込み。",
      ko: "Grab은 어디서나 저렴. KLIA 익스프레스로 KL 센트럴까지 33분. MRT/LRT가 주요 관광지를 커버. 정체 주의 — 도시 횡단에 90분 잡으세요.",
    },
    cost: { Flights: 150, Accommodation: 200, Food: 130, Transport: 60, Activities: 80 },
    safety: {
      en: ["Generally safe. Bag snatchings from motorbikes occur — wear bag across body, away from road.", "Tap water is treated but bottled is safer.", "Haze season (Aug–Oct) can hit unhealthy AQI — check IQAir."],
      ja: ["全般に安全。バイクからのひったくりに注意 — バッグは車道と反対側に斜め掛けで。", "水道水は処理済みですが、ボトル水が安全。", "ヘイズ・シーズン (8〜10月) はAQIが悪化 — IQAirで確認。"],
      ko: ["전반적으로 안전. 오토바이 가방 날치기 주의 — 가방은 차도 반대편으로 크로스.", "수돗물은 처리됐지만 생수가 더 안전.", "헤이즈 시즌 (8–10월) AQI 악화 — IQAir 확인."],
    },
    photoSpots: {
      en: ["Petronas Towers from KLCC Park lake fountain", "Batu Caves rainbow stairs", "Saloma Link bridge at night", "Heli Lounge bar helipad", "Thean Hou Temple lanterns"],
      ja: ["KLCC公園の噴水越しのペトロナス・タワー", "バトゥ洞窟のレインボー階段", "夜のサロマ・リンク橋", "ヘリ・ラウンジのヘリパッド", "天后宮のランタン"],
      ko: ["KLCC 공원 분수 너머 페트로나스 타워", "바투 동굴 무지개 계단", "밤의 살로마 링크 브릿지", "헬리 라운지 헬리패드", "텐허우 사원 등불"],
    },
  },
  {
    id: "maldives",
    name: { en: "Maldives", ja: "モルディブ", ko: "몰디브" },
    country: { en: "Maldives", ja: "モルディブ", ko: "몰디브" },
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Over-water villas, glass-clear lagoons, the bluest blue on earth. Splurge worthily.",
      ja: "水上ヴィラと透明なラグーン、地球上で最も青い青。奮発する価値あり。",
      ko: "수상 빌라, 유리처럼 맑은 라군, 지구에서 가장 푸른 푸름. 사치할 가치가 있습니다.",
    },
    flight: "4h 30m",
    daily: 400,
    season: { en: "Nov–Apr", ja: "11〜4月", ko: "11–4월" },
    overview: {
      en: "One island, one resort. Pick your island carefully — it's where you'll be for the whole trip. Seaplane transfers cost USD 400–600 return and end at sunset; speedboat resorts are closer/cheaper. Bring reef-safe sunscreen.",
      ja: "1島1リゾート。滞在中ずっと過ごす場所なので慎重に選びましょう。水上飛行機の往復はUSD 400〜600、日没で運航終了。スピードボートのリゾートは近くて安い。サンゴに優しい日焼け止め必須。",
      ko: "한 섬에 한 리조트. 신중히 고르세요 — 여행 내내 그곳에 머뭅니다. 수상비행기 왕복은 USD 400–600, 일몰 후 운항 중단. 스피드보트 리조트는 가깝고 저렴. 산호 친화 자외선 차단제 필수.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Arrive & decompress", ja: "1日目 — 到着とリラックス", ko: "1일차 — 도착과 휴식" },
        items: {
          en: ["Seaplane or speedboat transfer", "Lagoon snorkel from the villa", "Sunset cocktail at the over-water bar", "Beach dinner under the stars"],
          ja: ["水上飛行機かスピードボートで移動", "ヴィラからラグーンでシュノーケル", "水上バーでサンセット・カクテル", "星空の下のビーチ・ディナー"],
          ko: ["수상비행기 또는 스피드보트 이동", "빌라에서 라군 스노클링", "수상 바에서 노을 칵테일", "별빛 아래 비치 디너"],
        },
      },
      {
        day: { en: "Day 2 — Underwater", ja: "2日目 — 海中世界", ko: "2일차 — 바닷속" },
        items: {
          en: ["Morning dive or snorkel safari", "Reef shark + ray feeding (resort dependent)", "Spa or hammock afternoon", "Bioluminescent plankton beach walk (seasonal)"],
          ja: ["朝のダイビングまたはシュノーケル・サファリ", "リーフシャーク+エイの餌付け (リゾートによる)", "午後はスパかハンモック", "夜光虫の浜辺散歩 (季節限定)"],
          ko: ["아침 다이빙 또는 스노클 사파리", "리프 샤크 + 가오리 먹이주기 (리조트별)", "오후 스파 또는 해먹", "야광 플랑크톤 해변 산책 (시즌제)"],
        },
      },
      {
        day: { en: "Day 3 — Active", ja: "3日目 — アクティブ", ko: "3일차 — 액티브" },
        items: {
          en: ["Sandbank picnic excursion", "Sunset dolphin cruise", "Manta ray or whale shark trip (Baa Atoll)", "Private dinner on the deck"],
          ja: ["サンドバンクでピクニック", "夕日のドルフィン・クルーズ", "マンタかジンベイザメ・ツアー (バー環礁)", "デッキでプライベート・ディナー"],
          ko: ["모래톱 피크닉", "노을 돌고래 크루즈", "만타가오리 또는 고래상어 투어 (바아 환초)", "데크 프라이빗 디너"],
        },
      },
    ],
    food: {
      en: ["Mas huni (tuna + coconut breakfast)", "Garudhiya (clear fish broth)", "Fresh reef fish grills", "Hedhikaa (Maldivian short eats)", "Resort tasting menus from international chefs"],
      ja: ["マスフニ (ツナとココナッツの朝食)", "ガルディヤ (透き通った魚スープ)", "リーフフィッシュのグリル", "ヘディカ (モルディブ風スナック)", "国際シェフのリゾート・テイスティング・メニュー"],
      ko: ["마스 후니 (참치+코코넛 아침)", "가루디야 (맑은 생선 국물)", "신선한 리프피쉬 그릴", "헤디까 (몰디브식 간식)", "글로벌 셰프 리조트 테이스팅 메뉴"],
    },
    transport: {
      en: "Seaplane (daylight only) or speedboat from Malé MLE. No local transport between resorts. Walking + bicycle within the island.",
      ja: "マレ国際空港 (MLE) から水上飛行機 (日中のみ) かスピードボート。リゾート間の現地交通はなし。島内は徒歩か自転車。",
      ko: "말레 공항 (MLE)에서 수상비행기 (주간만) 또는 스피드보트. 리조트 간 현지 교통 없음. 섬 내에서는 도보·자전거.",
    },
    cost: { Flights: 800, Accommodation: 2400, Food: 600, Transport: 500, Activities: 300 },
    safety: {
      en: ["Very safe. Resorts are gated and staffed 24/7.", "Strong currents at channels — listen to the dive crew.", "Resort alcohol is legal; local islands are dry — respect customs.", "Sun is unforgiving. SPF50, hat, rash vest."],
      ja: ["非常に安全。リゾートはゲート式で24時間スタッフ常駐。", "チャネルの潮流が強い — ダイブクルーの指示を守って。", "リゾートはアルコール可、地元の島は禁酒 — 慣習を尊重。", "日差しは容赦なし。SPF50、帽子、ラッシュガード必須。"],
      ko: ["매우 안전. 리조트는 게이트와 24시간 스태프 운영.", "수로의 조류가 강함 — 다이브 크루 지시 준수.", "리조트는 음주 가능, 현지 섬은 금주 — 관습 존중.", "햇볕이 가차 없음. SPF50, 모자, 래시가드."],
    },
    photoSpots: {
      en: ["Drone shot of the villa jetty", "Sandbank at low tide", "Underwater portrait at a coral bommie", "Sunset from the over-water hammock", "Bioluminescent plankton (Vaadhoo)"],
      ja: ["ヴィラ桟橋のドローン空撮", "干潮のサンドバンク", "サンゴ礁での水中ポートレート", "水上ハンモックからの夕日", "夜光プランクトン (ヴァードゥー)"],
      ko: ["빌라 잔교 드론 샷", "간조의 모래톱", "산호초에서 수중 인물 사진", "수상 해먹에서 본 노을", "야광 플랑크톤 (바아두)"],
    },
  },
  {
    id: "phuket-krabi",
    name: { en: "Phuket & Krabi", ja: "プーケット & クラビ", ko: "푸켓 & 끄라비" },
    country: { en: "Thailand", ja: "タイ", ko: "태국" },
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Karst cliffs, longtail boats, and beach bars. The Andaman coast at its photogenic best.",
      ja: "カルスト断崖、ロングテールボート、ビーチバー。アンダマン海岸が最もフォトジェニックな姿。",
      ko: "카르스트 절벽, 롱테일 보트, 비치 바. 가장 포토제닉한 안다만 해안.",
    },
    flight: "2h 00m",
    daily: 100,
    season: { en: "Nov–Mar", ja: "11〜3月", ko: "11–3월" },
    overview: {
      en: "Base in Phuket for nightlife, Krabi (Ao Nang or Railay) for quiet beaches. Phi Phi and James Bond Island day-trip from either. Avoid the May–Oct monsoon — boats get cancelled, snorkel viz drops.",
      ja: "ナイトライフはプーケットを拠点に、静かなビーチはクラビ (アオナンまたはライレイ)。ピピ島とジェームズ・ボンド島はどちらからでも日帰り可。5〜10月のモンスーンは避けて — ボートが欠航し、シュノーケル視界も悪化。",
      ko: "야간 생활은 푸켓 거점, 조용한 해변은 끄라비 (아오낭 또는 라일레이). 피피섬과 제임스 본드 섬은 양쪽에서 당일치기. 5–10월 몬순은 피하세요 — 보트 결항, 스노클 시야 저하.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Phuket", ja: "1日目 — プーケット", ko: "1일차 — 푸켓" },
        items: {
          en: ["Old Phuket Town heritage walk", "Lunch at Raya restaurant", "Sunset at Promthep Cape", "Bangla Road night out (or skip it)"],
          ja: ["プーケット・オールドタウンの歴史散策", "Rayaレストランでランチ", "プロンテープ岬の夕日", "バングラ通りで夜遊び (避けるのも可)"],
          ko: ["푸켓 올드타운 헤리티지 산책", "라야 레스토랑 점심", "프롬텝 곶 노을", "방글라 로드 나이트 (생략 가능)"],
        },
      },
      {
        day: { en: "Day 2 — Island day", ja: "2日目 — 島巡り", ko: "2일차 — 섬 투어" },
        items: {
          en: ["Phi Phi + Maya Bay speedboat tour", "Snorkel at Bamboo Island", "Sunset Phang Nga Bay alternative", "Beachfront seafood dinner"],
          ja: ["ピピ島 + マヤ・ベイのスピードボート・ツアー", "バンブー島でシュノーケル", "夕日はパンガー湾という選択肢も", "ビーチフロントで海鮮ディナー"],
          ko: ["피피섬 + 마야 베이 스피드보트", "뱀부 아일랜드 스노클링", "노을은 팡응아 만 대안", "비치프런트 해산물 디너"],
        },
      },
      {
        day: { en: "Day 3 — Krabi", ja: "3日目 — クラビ", ko: "3일차 — 끄라비" },
        items: {
          en: ["Ferry or van to Ao Nang", "Longtail to Railay West for rock climbing/swim", "Phra Nang Cave beach", "Hot springs + Emerald Pool inland"],
          ja: ["フェリーかバンでアオナンへ", "ロングテール船でライレイ・ウェストへロッククライミング/海水浴", "プラナン洞窟のビーチ", "内陸の温泉 + エメラルド・プール"],
          ko: ["페리 또는 밴으로 아오낭", "롱테일로 라일레이 웨스트, 암벽등반/수영", "프라낭 동굴 비치", "내륙 온천 + 에메랄드 풀"],
        },
      },
    ],
    food: {
      en: ["Massaman curry", "Tom yum goong", "Fresh grilled snapper at beach shacks", "Roti with banana + condensed milk", "Khanom jeen noodles"],
      ja: ["マッサマン・カレー", "トムヤムクン", "ビーチ屋台の鯛のグリル", "ロティ・バナナ + コンデンスミルク", "カノムチン (タイそうめん)"],
      ko: ["마사만 카레", "톰얌꿍", "비치 노점 도미 그릴", "로띠 바나나 + 연유", "카놈찐 국수"],
    },
    transport: {
      en: "Phuket airport to Patong: 45 min. Grab works in Phuket town and airport zones. Krabi: longtail boats are the bus. Negotiate fares before boarding.",
      ja: "プーケット空港からパトンまで45分。Grabはプーケット・タウンと空港エリアで利用可。クラビではロングテール船が「バス」。乗船前に料金を交渉して。",
      ko: "푸켓 공항에서 빠통까지 45분. Grab은 푸켓 타운과 공항 구역에서 사용 가능. 끄라비는 롱테일 보트가 '버스'. 승선 전 요금 협상.",
    },
    cost: { Flights: 280, Accommodation: 350, Food: 150, Transport: 120, Activities: 200 },
    safety: {
      en: ["Jet-ski scams in Phuket are notorious — film the ski before AND after renting.", "Bangla Road: watch drinks, watch pickpockets.", "Riptides at Patong, Karon, Kata — check flag colour.", "Don't ride elephants. Visit ethical sanctuaries instead."],
      ja: ["プーケットのジェットスキー詐欺は有名 — 借りる前後に動画撮影を。", "バングラ通り: 飲み物とスリに注意。", "パトン・カロン・カタは離岸流 — 旗の色を確認。", "象には乗らない。倫理的なサンクチュアリへ。"],
      ko: ["푸켓 제트스키 사기 악명 높음 — 대여 전후 동영상 촬영.", "방글라 로드: 음료와 소매치기 주의.", "빠통, 까론, 까따의 이안류 — 깃발 색 확인.", "코끼리 타지 마세요. 윤리적 보호소를 방문."],
    },
    photoSpots: {
      en: ["Railay West at sunset", "Maya Bay (cap of visitors enforced)", "Big Buddha Phuket from below", "James Bond Island", "Phi Phi viewpoint hike"],
      ja: ["夕日のライレイ・ウェスト", "マヤ・ベイ (入場制限あり)", "下から見上げるビッグ・ブッダ・プーケット", "ジェームズ・ボンド島", "ピピ島ビューポイント・ハイキング"],
      ko: ["노을의 라일레이 웨스트", "마야 베이 (입장 제한)", "아래에서 본 푸켓 빅 부다", "제임스 본드 섬", "피피섬 뷰포인트 하이킹"],
    },
  },
  {
    id: "sydney",
    name: { en: "Sydney", ja: "シドニー", ko: "시드니" },
    country: { en: "Australia", ja: "オーストラリア", ko: "호주" },
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Bondi to Manly. Coffee that rivals Italy. Outdoorsy in a way few capitals are.",
      ja: "ボンダイからマンリーへ。イタリアに匹敵するコーヒー。これほどアウトドアな大都市は稀。",
      ko: "본다이부터 맨리까지. 이탈리아에 견줄 커피. 이만큼 야외적인 대도시는 드뭅니다.",
    },
    flight: "8h 00m",
    daily: 200,
    season: { en: "Sep–Nov, Mar–May", ja: "9〜11月、3〜5月", ko: "9–11월, 3–5월" },
    overview: {
      en: "Sydney is for early risers. Coastal walks, ferry rides, brunch culture. The Opera House and Harbour Bridge anchor the postcards, but the inner-west (Newtown, Marrickville) is the real flavour.",
      ja: "シドニーは早起き派の街。海岸ウォーク、フェリー、ブランチ文化。オペラハウスとハーバーブリッジは絵葉書の主役ですが、本当の味はインナーウェスト (ニュータウン、マリックヴィル)。",
      ko: "시드니는 일찍 일어나는 사람의 도시. 해안 산책, 페리, 브런치 문화. 오페라하우스와 하버 브릿지가 엽서의 상징이지만, 진짜 맛은 이너 웨스트 (뉴타운, 매릭빌)에 있습니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Icons", ja: "1日目 — 名所", ko: "1일차 — 아이콘" },
        items: {
          en: ["Royal Botanic Gardens + Mrs Macquarie's Chair", "Opera House tour", "Ferry to Manly + lunch at the wharf", "Sunset rooftop at Opera Bar"],
          ja: ["王立植物園 + マッコーリー夫人の椅子", "オペラハウス見学ツアー", "マンリー行きフェリー + 桟橋でランチ", "オペラ・バーのルーフトップで夕日"],
          ko: ["왕립 식물원 + 매쿼리 부인의 의자", "오페라하우스 투어", "맨리행 페리 + 부두 점심", "오페라 바 옥상 노을"],
        },
      },
      {
        day: { en: "Day 2 — Coast", ja: "2日目 — 海岸", ko: "2일차 — 해안" },
        items: {
          en: ["Bondi to Coogee coastal walk (6km)", "Bondi Icebergs swim", "Surry Hills brunch (Bills, Reuben Hills)", "Newtown evening — King St cafés"],
          ja: ["ボンダイからクージー海岸ウォーク (6km)", "ボンダイ・アイスバーグスでひと泳ぎ", "サリーヒルズでブランチ (Bills、Reuben Hills)", "ニュータウンの夜 — キング・ストリートのカフェ"],
          ko: ["본다이→쿠지 해안 산책 (6km)", "본다이 아이스버그 수영", "서리힐스 브런치 (Bills, Reuben Hills)", "뉴타운 저녁 — 킹 스트리트 카페"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["Blue Mountains: Three Sisters + Wentworth Falls", "Or: Royal National Park coastal cliffs", "Sydney Fish Market lunch", "Darling Harbour fireworks (Saturdays)"],
          ja: ["ブルーマウンテンズ: スリー・シスターズ + ウェントワース滝", "またはロイヤル国立公園の海岸断崖", "シドニー・フィッシュ・マーケットでランチ", "ダーリング・ハーバーの花火 (土曜)"],
          ko: ["블루마운틴: 세 자매봉 + 웬트워스 폭포", "또는 로얄 국립공원 해안 절벽", "시드니 피시 마켓 점심", "달링 하버 불꽃놀이 (토요일)"],
        },
      },
    ],
    food: {
      en: ["Flat white, anywhere good", "Hot smoked salmon at Bondi", "Lamingtons + Tim Tams", "Vietnamese in Cabramatta", "Pub schnitzel parm"],
      ja: ["どこでも美味しいフラットホワイト", "ボンダイのホット・スモークサーモン", "ラミントン + ティムタム", "カブラマタのベトナム料理", "パブのシュニッツェル・パーマ"],
      ko: ["어디서나 맛있는 플랫 화이트", "본다이의 핫 스모크 연어", "라밍턴 + 팀탐", "캐브라마타 베트남 음식", "펍 슈니첼 파르마"],
    },
    transport: {
      en: "Opal card on trains, buses, ferries. Airport: 13 min by train, but $$$ gate fee. Ferries are practically tourist attractions priced as commuter fares.",
      ja: "オパール・カードで電車・バス・フェリー。空港は電車で13分だがゲート料金が高い。フェリーは通勤運賃の観光名物。",
      ko: "오팔 카드로 기차, 버스, 페리. 공항까지 기차 13분, 다만 게이트 요금이 비쌉니다. 페리는 통근 요금으로 즐기는 관광 명물.",
    },
    cost: { Flights: 1200, Accommodation: 800, Food: 400, Transport: 100, Activities: 200 },
    safety: {
      en: ["Very safe overall. Watch alcohol-fuelled crowds in Kings Cross on weekends.", "Surf only between the flags — rips are real.", "Bushfire smoke can be heavy summer afternoons; check AQI.", "Walk on the left, drive on the left."],
      ja: ["全般に非常に安全。週末のキングス・クロスの酔客には注意。", "サーフはフラッグの間で — 離岸流は本物。", "夏の午後はブッシュファイヤーの煙が出ることも — AQI確認。", "歩行も運転も左側通行。"],
      ko: ["전반적으로 매우 안전. 주말 킹스 크로스의 술 취한 인파 주의.", "서핑은 깃발 사이에서만 — 이안류 위험.", "여름 오후 산불 연기 짙을 수 있음 — AQI 확인.", "보행과 운전 모두 좌측통행."],
    },
    photoSpots: {
      en: ["Opera House from Mrs Macquarie's Chair", "Bondi Beach from Bondi Icebergs deck", "Sydney Harbour Bridge from Milsons Point", "Wedding Cake Rock (closed but viewpoint open)", "Hyams Beach for the whitest sand"],
      ja: ["マッコーリー夫人の椅子から見るオペラハウス", "ボンダイ・アイスバーグスのデッキから見るボンダイ・ビーチ", "ミルソンズ・ポイントから見るハーバーブリッジ", "ウェディング・ケーキ・ロック (立入禁止だが展望は開放)", "白砂のハイアムズ・ビーチ"],
      ko: ["매쿼리 부인의 의자에서 본 오페라하우스", "본다이 아이스버그 데크에서 본 본다이 비치", "밀슨스 포인트에서 본 하버 브릿지", "웨딩 케이크 록 (출입 금지, 전망대 개방)", "최고로 흰 모래 하이엄스 비치"],
    },
  },
  {
    id: "taipei",
    name: { en: "Taipei", ja: "台北", ko: "타이베이" },
    country: { en: "Taiwan", ja: "台湾", ko: "대만" },
    images: [
      "https://images.unsplash.com/photo-1552248524-10d9a7e4841c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1601276861758-2d9c5ca69a17?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Night markets, hot springs, and the friendliest service in Asia. Underrated.",
      ja: "夜市、温泉、アジアで最も親切なサービス。過小評価されがちな街。",
      ko: "야시장, 온천, 아시아에서 가장 친절한 서비스. 저평가된 도시.",
    },
    flight: "4h 30m",
    daily: 130,
    season: { en: "Oct–Dec", ja: "10〜12月", ko: "10–12월" },
    overview: {
      en: "Taipei is walkable, deeply foodie, and gentle on the wallet. Start with night markets, work outward to tea farms in Maokong and onsen in Beitou. The MRT is spotless, the people exceptional.",
      ja: "台北は歩きやすく、グルメ深く、財布にも優しい。まず夜市から、貓空の茶畑や北投の温泉へと広げていきましょう。MRTは清潔、人は格別。",
      ko: "타이베이는 걷기 좋고, 깊은 미식 문화에 지갑에도 부담 없습니다. 야시장에서 시작해 마오쿵 차밭, 베이터우 온천으로 확장하세요. MRT는 깨끗하고 사람은 특별합니다.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Central", ja: "1日目 — 中心部", ko: "1일차 — 중심부" },
        items: {
          en: ["Chiang Kai-shek Memorial + changing of the guard", "Lunch at Din Tai Fung (Xinyi)", "Taipei 101 observation deck", "Shilin Night Market dinner"],
          ja: ["中正紀念堂 + 衛兵交代式", "鼎泰豐 (信義店) でランチ", "台北101展望台", "士林夜市で夕食"],
          ko: ["중정기념당 + 위병 교대식", "딘타이펑 (신이점) 점심", "타이베이 101 전망대", "스린 야시장 저녁"],
        },
      },
      {
        day: { en: "Day 2 — Old town & tea", ja: "2日目 — 旧市街と茶", ko: "2일차 — 구시가와 차" },
        items: {
          en: ["Longshan Temple + Bopiliao Historic Block", "Ximending shopping district", "Maokong gondola + tea farms", "Raohe Night Market (smaller, better)"],
          ja: ["龍山寺 + 剝皮寮歴史街区", "西門町ショッピングエリア", "貓空ロープウェイ + 茶畑", "饒河街夜市 (小規模だが質高)"],
          ko: ["롱산쓰 + 보피랴오 역사거리", "시먼딩 쇼핑 지구", "마오쿵 곤돌라 + 차밭", "라오허제 야시장 (작지만 좋음)"],
        },
      },
      {
        day: { en: "Day 3 — Day trip", ja: "3日目 — 日帰り旅行", ko: "3일차 — 당일 여행" },
        items: {
          en: ["Jiufen old street (Spirited Away vibes)", "Shifen Waterfall + sky lanterns", "Yehliu Geopark sea sculptures", "Beitou hot springs to finish"],
          ja: ["九份老街 (千と千尋の世界観)", "十分の滝 + 天燈上げ", "野柳地質公園の奇岩", "締めは北投温泉で"],
          ko: ["주펀 라오제 (센과 치히로 분위기)", "스펀 폭포 + 천등 날리기", "예류 지질공원 기암", "마무리는 베이터우 온천"],
        },
      },
    ],
    food: {
      en: ["Beef noodle soup", "Xiao long bao at Din Tai Fung", "Stinky tofu (try once)", "Lu rou fan (braised pork rice)", "Fluffy shaved ice with mango"],
      ja: ["牛肉麺", "鼎泰豐の小籠包", "臭豆腐 (一度は挑戦)", "魯肉飯", "ふわふわマンゴーかき氷"],
      ko: ["우육면", "딘타이펑 샤오롱바오", "처우더우푸 (한 번은 시도)", "루러우판 (돼지고기 덮밥)", "푹신한 망고 빙수"],
    },
    transport: {
      en: "EasyCard on MRT, buses, YouBike. Airport MRT to Taipei Main: 35 min. Taxis are cheap and metered.",
      ja: "悠遊カードでMRT・バス・YouBike。空港MRTで台北車站まで35分。タクシーは安くメーター式。",
      ko: "이지카드로 MRT, 버스, 유바이크. 공항 MRT로 타이베이 메인까지 35분. 택시는 저렴하고 미터제.",
    },
    cost: { Flights: 500, Accommodation: 400, Food: 180, Transport: 60, Activities: 100 },
    safety: {
      en: ["Very safe at any hour. Lost wallets get handed in.", "Earthquakes possible — modern buildings are well-engineered.", "Typhoon season Jul–Sep can interrupt travel.", "Pedestrian crossings: drivers in Taipei are not deferential — watch turning cars."],
      ja: ["どの時間帯も非常に安全。落し物は届きます。", "地震は起こりうるが現代建築は耐震性高し。", "7〜9月の台風シーズンは旅程に影響することも。", "横断歩道: 台北のドライバーは譲ってくれないことも — 曲がる車に注意。"],
      ko: ["언제든 매우 안전. 분실 지갑도 신고됩니다.", "지진 가능 — 현대 건물은 내진 설계.", "7–9월 태풍 시즌은 여행에 영향을 줄 수 있음.", "횡단보도: 타이베이 운전자는 양보하지 않을 수 있음 — 회전 차량 주의."],
    },
    photoSpots: {
      en: ["Jiufen tea house lanterns at dusk", "Taipei 101 from Xiangshan (Elephant Mountain) hike", "Pingxi sky lantern release", "Beitou hot spring steam", "Maokong tea farm rows"],
      ja: ["九份の茶藝館のランタン (黄昏どき)", "象山ハイキングから見る台北101", "平渓の天燈上げ", "北投温泉の湯けむり", "貓空の茶畑の畝"],
      ko: ["주펀 찻집 등불 (해질 무렵)", "샹산 하이킹에서 본 타이베이 101", "핑시 천등 날리기", "베이터우 온천 김", "마오쿵 차밭 이랑"],
    },
  },
  {
    id: "hanoi",
    name: { en: "Hanoi", ja: "ハノイ", ko: "하노이" },
    country: { en: "Vietnam", ja: "ベトナム", ko: "베트남" },
    images: [
      "https://images.unsplash.com/photo-1599708153386-62bf3cad9bf2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80",
    ],
    teaser: {
      en: "Old Quarter chaos, lakeside calm, and the best USD-2 bowl of pho you'll ever eat.",
      ja: "旧市街のカオス、湖畔の静けさ、人生最高のUSD2のフォー。",
      ko: "옛 구역의 혼돈, 호숫가의 고요, 인생 최고의 2달러 쌀국수.",
    },
    flight: "3h 30m",
    daily: 60,
    season: { en: "Oct–Apr", ja: "10〜4月", ko: "10–4월" },
    overview: {
      en: "Hanoi is layered — French colonial boulevards, communist-era monuments, frantic Old Quarter alleys. Slow down. Sit on a tiny plastic stool. Order whatever the table next to you is having.",
      ja: "ハノイは多層的 — フランス植民地時代の大通り、共産主義期の記念碑、旧市街の慌ただしい路地。テンポを落とし、小さなプラ椅子に座り、隣のテーブルと同じものを頼みましょう。",
      ko: "하노이는 겹겹의 도시 — 프랑스 식민지 가로수길, 공산주의 시대 기념물, 분주한 옛 구역 골목. 속도를 늦추고 작은 플라스틱 의자에 앉아 옆 테이블과 같은 걸 시키세요.",
    },
    itinerary: [
      {
        day: { en: "Day 1 — Old Quarter", ja: "1日目 — 旧市街", ko: "1일차 — 옛 구역" },
        items: {
          en: ["Hoan Kiem Lake morning walk", "Old Quarter 36 streets exploration", "Banh mi 25 + egg coffee at Giảng", "Water puppet show + bia hoi corner"],
          ja: ["ホアンキエム湖の朝散歩", "旧市街36通りを散策", "Banh Mi 25 + Giảngのエッグ・コーヒー", "水上人形劇 + ビアホイ角で一杯"],
          ko: ["호안끼엠 호수 아침 산책", "옛 구역 36 거리 탐험", "반미 25 + 지앙의 에그 커피", "수상 인형극 + 비아호이 코너"],
        },
      },
      {
        day: { en: "Day 2 — Heritage", ja: "2日目 — ヘリテージ", ko: "2일차 — 헤리티지" },
        items: {
          en: ["Ho Chi Minh Mausoleum (close mornings)", "Temple of Literature", "Train Street coffee (check current rules)", "Bun cha lunch on Le Van Huu"],
          ja: ["ホー・チ・ミン廟 (午前は閉鎖の日も)", "文廟", "トレイン・ストリートでコーヒー (現行ルール確認)", "Le Van Huu通りでブンチャー・ランチ"],
          ko: ["호치민 영묘 (오전 휴무 있음)", "문묘", "트레인 스트리트 커피 (현재 규정 확인)", "레반흐 거리 분짜 점심"],
        },
      },
      {
        day: { en: "Day 3 — Halong Bay", ja: "3日目 — ハロン湾", ko: "3일차 — 하롱베이" },
        items: {
          en: ["Day cruise to Halong or quieter Lan Ha Bay", "Kayak through karst caves", "Seafood lunch on board", "Return to Hanoi for late dinner"],
          ja: ["ハロン湾または静かなランハ湾へ日帰りクルーズ", "カルストの洞窟をカヤックで", "船上で海鮮ランチ", "ハノイに戻って遅い夕食"],
          ko: ["하롱베이 또는 더 조용한 란하베이 당일 크루즈", "카르스트 동굴 카약", "선상 해산물 점심", "하노이로 돌아와 늦은 저녁"],
        },
      },
    ],
    food: {
      en: ["Pho — beef in the morning, chicken at night", "Bun cha (Obama-Bourdain set)", "Banh mi from a cart", "Egg coffee (cà phê trứng)", "Cha ca grilled turmeric fish"],
      ja: ["フォー — 朝は牛、夜は鶏", "ブンチャー (オバマ＆ブルデーン定食)", "屋台のバインミー", "エッグ・コーヒー (cà phê trứng)", "チャーカー (ターメリック焼き魚)"],
      ko: ["퍼 — 아침엔 소고기, 밤엔 닭고기", "분짜 (오바마-부르댄 세트)", "노점 반미", "에그 커피 (cà phê trứng)", "짜까 (강황 생선구이)"],
    },
    transport: {
      en: "Grab is cheap and reliable. Old Quarter is best on foot — traffic is a contact sport for crossings. Noi Bai Airport: ~45 min by Grab or shuttle bus.",
      ja: "Grabは安くて信頼性高。旧市街は徒歩がベスト — 横断は格闘技。ノイバイ空港まではGrabかシャトルバスで約45分。",
      ko: "Grab은 저렴하고 신뢰도 높음. 옛 구역은 도보가 베스트 — 횡단은 거의 격투기. 노이바이 공항까지 Grab 또는 셔틀버스로 약 45분.",
    },
    cost: { Flights: 280, Accommodation: 150, Food: 80, Transport: 40, Activities: 100 },
    safety: {
      en: ["Watch your bag from scooters when walking the Old Quarter.", "Crossing the road: walk steadily, predictably, let bikes flow around you.", "Tap water is not safe — bottled or boiled only.", "Air quality is poor in winter — N95 helpful."],
      ja: ["旧市街を歩く際はスクーターからのバッグ強奪に注意。", "横断のコツ: 一定のペースで予測可能に歩く。バイクは避けてくれます。", "水道水は不可 — ボトル水か煮沸のみ。", "冬は大気汚染がひどい — N95があると安心。"],
      ko: ["옛 구역 도보 시 스쿠터 가방 날치기 주의.", "도로 횡단: 일정한 속도로 예측 가능하게 걸으세요. 오토바이가 알아서 비켜갑니다.", "수돗물은 음용 불가 — 생수나 끓인 물만.", "겨울 대기질이 나쁨 — N95 권장."],
    },
    photoSpots: {
      en: ["Hoan Kiem Lake at dawn with rowers", "Train Street (whichever cafés still operate)", "Temple of Literature courtyards", "St Joseph's Cathedral neo-Gothic", "Halong Bay from a junk boat"],
      ja: ["夜明けのホアンキエム湖と漕ぎ手", "トレイン・ストリート (営業中のカフェへ)", "文廟の中庭", "聖ヨゼフ大聖堂 (ネオゴシック)", "ジャンク船から見るハロン湾"],
      ko: ["새벽 호안끼엠 호수와 노 젓는 사람들", "트레인 스트리트 (영업 중인 카페)", "문묘 안뜰", "성요셉 대성당 (네오고딕)", "정크선에서 본 하롱베이"],
    },
  },
];

/* ---------- FX rates ---------- */

const FX_RATES_PER_SGD = {
  USD: 0.74,
  JPY: 112.0,
  KRW: 1010.0,
  THB: 26.5,
  MYR: 3.45,
  IDR: 11800.0,
  AUD: 1.13,
  HKD: 5.78,
  VND: 18600.0,
  TWD: 23.5,
};

/* ---------- Packing checklist (localised) ---------- */

const PACKING = {
  en: [
    { category: "Documents", items: ["Passport (6+ months validity)", "Visa printout", "Flight tickets", "Travel insurance", "Driving licence + IDP", "Vaccination certificate", "Photocopy of passport"] },
    { category: "Clothing", items: ["T-shirts × 5", "Light jacket / rain shell", "Walking shoes", "Sandals / flip-flops", "Swimwear", "Socks × 5", "Underwear × 5"] },
    { category: "Electronics", items: ["Phone + charger", "Power bank (under 100Wh)", "Universal adapter", "Camera + spare battery", "Earphones", "Laptop / tablet"] },
    { category: "Medication", items: ["Personal prescriptions", "Paracetamol / ibuprofen", "Antihistamines", "Rehydration salts", "Plasters + antiseptic", "Anti-diarrhoeal", "Motion sickness tablets"] },
    { category: "Travel essentials", items: ["Reusable water bottle", "Travel pillow + eye mask", "Sunscreen SPF50", "Insect repellent", "Microfibre towel", "Reef-safe sunscreen (beach)", "Reusable shopping bag"] },
  ],
  ja: [
    { category: "書類", items: ["パスポート (有効期限6か月以上)", "ビザの印刷", "航空券", "旅行保険", "運転免許証 + 国際免許", "ワクチン接種証明書", "パスポートのコピー"] },
    { category: "衣類", items: ["Tシャツ × 5", "薄手のジャケット/レインシェル", "ウォーキングシューズ", "サンダル/ビーチサンダル", "水着", "靴下 × 5", "下着 × 5"] },
    { category: "電子機器", items: ["スマホ + 充電器", "モバイルバッテリー (100Wh以下)", "ユニバーサル変換プラグ", "カメラ + 予備バッテリー", "イヤホン", "ノートPC/タブレット"] },
    { category: "医薬品", items: ["処方薬", "パラセタモール/イブプロフェン", "抗ヒスタミン薬", "経口補水塩", "絆創膏 + 消毒薬", "下痢止め", "酔い止め"] },
    { category: "旅行必需品", items: ["再利用可能ボトル", "トラベルピロー + アイマスク", "日焼け止め SPF50", "虫除け", "マイクロファイバータオル", "リーフセーフな日焼け止め (ビーチ用)", "エコバッグ"] },
  ],
  ko: [
    { category: "서류", items: ["여권 (유효기간 6개월 이상)", "비자 출력본", "항공권", "여행자 보험", "운전면허증 + 국제면허", "백신 접종 증명서", "여권 사본"] },
    { category: "의류", items: ["티셔츠 × 5", "얇은 재킷 / 레인 셸", "워킹화", "샌들 / 슬리퍼", "수영복", "양말 × 5", "속옷 × 5"] },
    { category: "전자기기", items: ["휴대폰 + 충전기", "보조 배터리 (100Wh 이하)", "유니버설 어댑터", "카메라 + 예비 배터리", "이어폰", "노트북 / 태블릿"] },
    { category: "의약품", items: ["개인 처방약", "파라세타몰 / 이부프로펜", "항히스타민제", "경구 수액 분말", "밴드 + 소독약", "지사제", "멀미약"] },
    { category: "여행 필수품", items: ["다회용 물병", "여행 베개 + 안대", "자외선 차단제 SPF50", "방충제", "극세사 수건", "산호 친화 자외선 차단제 (해변용)", "에코백"] },
  ],
};

/* =========================================================
 * DOM HELPERS
 * ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const sgd = (n) => "SGD " + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Renders an image inside a styled wrapper. Accepts an array of candidate URLs;
 * if one fails to load, the img element automatically tries the next.
 * extraClass lets callers add modifiers like "modal-hero" or "city-image". */
function imgWrap(sources, alt, extraClass, loading) {
  const list = Array.isArray(sources) ? sources : [sources];
  const cls = ["img-wrap", extraClass || ""].filter(Boolean).join(" ");
  const load = loading || "lazy";
  const sourcesAttr = esc(JSON.stringify(list));
  return `<div class="${cls}" role="img" aria-label="${esc(alt)}">
    <img src="${esc(list[0])}" alt="${esc(alt)}" loading="${load}"
         data-sources="${sourcesAttr}" data-index="0"
         onerror="window.__tryNextImg(this)" />
  </div>`;
}

window.__tryNextImg = function (img) {
  try {
    const sources = JSON.parse(img.dataset.sources || "[]");
    const next = (parseInt(img.dataset.index, 10) || 0) + 1;
    if (next < sources.length) {
      img.dataset.index = next;
      img.src = sources[next];
    } else {
      img.removeAttribute("onerror");
      img.style.display = "none";
    }
  } catch (e) {
    img.style.display = "none";
  }
};

/* =========================================================
 * INITIALISE
 * ========================================================= */

let currentGuideId = null;

document.addEventListener("DOMContentLoaded", () => {
  setLang(detectInitialLang());
  applyDOMTranslations();
  renderFeatured();
  renderCityCards();
  populateCitySelects();
  initBudgetCalculator();
  initFxConverter();
  renderPackingChecklist();
  initItineraryPlanner();
  initWeather();
  initEnquiryForm();
  initModal();
  initNavToggle();
  initThemeToggle();
  initLangSwitcher();
  initReveal();
  initMagnet();
  $("#footer-year").textContent = new Date().getFullYear();
});

/* =========================================================
 * I18N — DOM application + switcher
 * ========================================================= */

function applyDOMTranslations() {
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (el.hasAttribute("data-text")) el.setAttribute("data-text", value);

    // If the element wraps form controls (e.g. <label>Foo<input/></label>),
    // only update the leading text node so children are preserved.
    const hasElementChild = Array.from(el.childNodes).some((n) => n.nodeType === 1);
    if (hasElementChild) {
      let textNode = null;
      for (const node of el.childNodes) {
        if (node.nodeType === 3) { textNode = node; break; }
      }
      if (textNode) {
        textNode.nodeValue = value + " ";
      } else {
        el.insertBefore(document.createTextNode(value + " "), el.firstChild);
      }
    } else {
      el.textContent = value;
    }
  });
  $$("[data-i18n-attr]").forEach((el) => {
    const spec = el.getAttribute("data-i18n-attr");
    spec.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s && s.trim());
      if (!attr || !key) return;
      el.setAttribute(attr, t(key));
    });
  });
  renderHeroTitle();
}

function renderHeroTitle() {
  const h1 = document.getElementById("hero-title");
  if (!h1) return;
  const key = h1.getAttribute("data-i18n-hero") || "hero.title";
  const text = t(key);
  // English splits by whitespace; CJK splits per character so the staggered
  // reveal still feels animated without word boundaries.
  const tokens = currentLang === "en" ? text.split(/\s+/) : Array.from(text);
  const joiner = currentLang === "en" ? " " : "";
  h1.innerHTML = tokens
    .map((tok, i) => `<span class="word" style="--i:${i}">${esc(tok)}</span>`)
    .join(joiner);
}

function initLangSwitcher() {
  const sel = $("#lang-switcher");
  if (!sel) return;
  sel.value = currentLang;
  sel.addEventListener("change", () => {
    setLang(sel.value);
    applyDOMTranslations();
    renderFeatured();
    renderCityCards();
    populateCitySelects();
    renderPackingChecklist();
    refreshBudgetDailyForCurrent();
    renderItineraryList();
    refreshOpenGuide();
  });
}

/* =========================================================
 * FEATURED CARD
 * ========================================================= */

function renderFeatured() {
  const featured = CITIES[0];
  $("#featured-card").innerHTML = `
    ${imgWrap(featured.images, loc(featured.name), "featured-image", "eager")}
    <div class="featured-body">
      <p class="eyebrow">${esc(t("modal.latest_guide"))}</p>
      <h3>${esc(loc(featured.name))}, ${esc(loc(featured.country))}</h3>
      <div class="featured-meta">
        <span>${esc(t("modal.flight", { value: loc(featured.flight) }))}</span>
        <span>${esc(t("modal.daily_from", { value: sgd(featured.daily) }))}</span>
        <span>${esc(t("modal.best_season", { value: loc(featured.season) }))}</span>
      </div>
      <p>${esc(loc(featured.overview))}</p>
      <button class="btn btn-primary" data-open-guide="${featured.id}">${esc(t("modal.open_guide"))}</button>
    </div>
  `;
}

/* =========================================================
 * CITY CARDS
 * ========================================================= */

function renderCityCards() {
  const grid = $("#cities-grid");
  grid.innerHTML = CITIES.map((c) => `
    <article class="city-card">
      ${imgWrap(c.images, loc(c.name), "city-image")}
      <div class="city-body">
        <span class="country">${esc(loc(c.country))}</span>
        <h3>${esc(loc(c.name))}</h3>
        <p class="teaser">${esc(loc(c.teaser))}</p>
        <div class="city-meta">
          <div><strong>${esc(loc(c.flight))}</strong>${esc(t("city.flight"))}</div>
          <div><strong>${sgd(c.daily)}</strong>${esc(t("city.daily"))}</div>
          <div><strong>${esc(loc(c.season))}</strong>${esc(t("city.season"))}</div>
        </div>
        <button class="btn btn-primary" data-open-guide="${c.id}">${esc(t("modal.view_guide"))}</button>
      </div>
    </article>
  `).join("");
}

/* =========================================================
 * DROPDOWNS — populate with cities
 * ========================================================= */

function populateCitySelects() {
  const opts = CITIES.map((c) => `<option value="${c.id}">${esc(loc(c.name))}, ${esc(loc(c.country))}</option>`).join("");

  const budgetSel = $("#budget-destination");
  const prevBudget = budgetSel.value;
  budgetSel.innerHTML = opts;
  if (prevBudget) budgetSel.value = prevBudget;

  const enquirySel = $("#enquiry-destination");
  const prevEnquiry = enquirySel.value;
  enquirySel.innerHTML = opts + `<option value="other">${esc(t("enquiry.other_option"))}</option>`;
  if (prevEnquiry) enquirySel.value = prevEnquiry;

  const fxSelect = $("#fx-target");
  if (!fxSelect.options.length) {
    fxSelect.innerHTML = Object.keys(FX_RATES_PER_SGD).map((cur) => `<option value="${cur}">${cur}</option>`).join("");
  }
}

/* =========================================================
 * BUDGET CALCULATOR
 * ========================================================= */

let _budgetRecalc = null;

function initBudgetCalculator() {
  const destSel = $("#budget-destination");
  const travellers = $("#budget-travellers");
  const days = $("#budget-days");
  const daily = $("#budget-daily");
  const total = $("#budget-total");

  const findCity = (id) => CITIES.find((c) => c.id === id);

  daily.value = findCity(destSel.value).daily;

  const recalc = () => {
    const t = Math.max(0, Number(travellers.value) || 0);
    const d = Math.max(0, Number(days.value) || 0);
    const p = Math.max(0, Number(daily.value) || 0);
    total.textContent = sgd(t * d * p);
  };

  _budgetRecalc = recalc;

  destSel.addEventListener("change", () => {
    daily.value = findCity(destSel.value).daily;
    recalc();
  });
  [travellers, days, daily].forEach((el) => el.addEventListener("input", recalc));
  recalc();
}

function refreshBudgetDailyForCurrent() {
  if (!_budgetRecalc) return;
  _budgetRecalc();
}

/* =========================================================
 * CURRENCY CONVERTER
 * ========================================================= */

function initFxConverter() {
  const amt = $("#fx-amount");
  const target = $("#fx-target");
  const out = $("#fx-result");

  const recalc = () => {
    const a = Math.max(0, Number(amt.value) || 0);
    const rate = FX_RATES_PER_SGD[target.value];
    const converted = a * rate;
    const decimals = converted >= 1000 ? 0 : 2;
    out.textContent = `${target.value} ${converted.toLocaleString(undefined, { maximumFractionDigits: decimals })}`;
  };

  [amt, target].forEach((el) => el.addEventListener("input", recalc));
  target.addEventListener("change", recalc);
  recalc();
}

/* =========================================================
 * PACKING CHECKLIST
 * ========================================================= */

function renderPackingChecklist() {
  const root = $("#packing");
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.packing) || "{}");
  const enList = PACKING.en;
  const list = PACKING[currentLang] || enList;

  root.innerHTML = list.map((cat, ci) => {
    const enCat = enList[ci];
    return `
    <div class="packing-cat">
      <h4>${esc(cat.category)}</h4>
      <ul>
        ${cat.items.map((item, ii) => {
          // Stable ID always derived from English text so user state survives language switching.
          const enItem = (enCat && enCat.items[ii]) || item;
          const id = `pack-${enCat.category}-${enItem}`.replace(/\W+/g, "-").toLowerCase();
          const checked = saved[id] ? "checked" : "";
          return `<li class="${checked ? "checked" : ""}">
            <input type="checkbox" id="${id}" ${checked} />
            <label for="${id}">${esc(item)}</label>
          </li>`;
        }).join("")}
      </ul>
    </div>
  `;
  }).join("");

  if (!root._wired) {
    root._wired = true;
    root.addEventListener("change", (e) => {
      if (e.target.type !== "checkbox") return;
      const state = JSON.parse(localStorage.getItem(STORAGE_KEYS.packing) || "{}");
      state[e.target.id] = e.target.checked;
      localStorage.setItem(STORAGE_KEYS.packing, JSON.stringify(state));
      e.target.closest("li").classList.toggle("checked", e.target.checked);
    });
  }
}

/* =========================================================
 * ITINERARY PLANNER
 * ========================================================= */

let _itineraryRender = null;

function initItineraryPlanner() {
  const form = $("#itinerary-form");
  const list = $("#itinerary-list");

  const load = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.itinerary) || "[]");
  const save = (items) => localStorage.setItem(STORAGE_KEYS.itinerary, JSON.stringify(items));

  const render = () => {
    const items = load().sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
    if (!items.length) {
      list.innerHTML = `<li style="border-left-color:transparent;color:var(--muted);font-style:italic">${esc(t("tools.itinerary.empty"))}</li>`;
      return;
    }
    const dayWord = t("tools.itinerary.day");
    const isPrefixLang = currentLang === "en";
    list.innerHTML = items.map((it) => {
      const dayLabel = isPrefixLang ? `${dayWord} ${esc(it.day)}` : `${esc(it.day)}${dayWord}`;
      return `
      <li>
        <span class="day">${dayLabel}</span>
        <span class="time">${esc(it.time)}</span>
        <span>
          <span class="activity">${esc(it.activity)}</span>
          ${it.notes ? `<span class="notes">${esc(it.notes)}</span>` : ""}
        </span>
        <button data-remove="${esc(it.id)}">${esc(t("tools.itinerary.remove"))}</button>
      </li>
    `;
    }).join("");
  };

  _itineraryRender = render;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
      day: Number($("#itin-day").value) || 1,
      time: $("#itin-time").value,
      activity: $("#itin-activity").value.trim(),
      notes: $("#itin-notes").value.trim(),
    };
    if (!newItem.activity || !newItem.time) return;
    const items = load();
    items.push(newItem);
    save(items);
    render();
    form.reset();
    $("#itin-day").value = newItem.day;
  });

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-remove]");
    if (!btn) return;
    const id = btn.getAttribute("data-remove");
    save(load().filter((it) => it.id !== id));
    render();
  });

  render();
}

function renderItineraryList() {
  if (_itineraryRender) _itineraryRender();
}

/* =========================================================
 * WEATHER (OpenWeather stub)
 * ========================================================= */

/*
 * To enable live weather:
 *   1. Sign up at https://openweathermap.org/api (free tier works)
 *   2. Generate an API key
 *   3. Replace YOUR_API_KEY_HERE below
 *   4. The fetchWeather() call below will use the live endpoint
 */
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

async function fetchWeather(city) {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
    return { error: t("weather.api_key_missing") };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const msg = res.status === 404 ? t("weather.city_not_found") : t("weather.service_error", { status: res.status });
      return { error: msg };
    }
    const data = await res.json();
    return {
      city: data.name,
      country: data.sys && data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      conditions: data.weather && data.weather[0] ? data.weather[0].description : "—",
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
    };
  } catch (err) {
    return { error: t("weather.network_error") };
  }
}

function initWeather() {
  const form = $("#weather-form");
  const input = $("#weather-city");
  const result = $("#weather-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    result.hidden = false;
    result.classList.remove("error");
    result.innerHTML = `<p style="color:var(--muted)">${esc(t("weather.checking", { city }))}</p>`;

    const data = await fetchWeather(city);
    if (data.error) {
      result.classList.add("error");
      result.innerHTML = `<p>${esc(data.error)}</p>`;
      return;
    }

    result.innerHTML = `
      <h4>${esc(data.city)}${data.country ? ", " + esc(data.country) : ""}</h4>
      <div class="temp">${data.temp}°C</div>
      <p class="conditions">${esc(data.conditions)} · ${esc(t("weather.feels_like"))} ${data.feelsLike}°C</p>
      <div class="stats">
        <div><strong>${data.humidity}%</strong>${esc(t("weather.humidity"))}</div>
        <div><strong>${data.wind} km/h</strong>${esc(t("weather.wind"))}</div>
      </div>
    `;
  });
}

/* =========================================================
 * ENQUIRY FORM
 * ========================================================= */

/*
 * Enquiry delivery tries the following in order:
 *   1. LOCAL_MAIL_ENDPOINT — the bundled mail-server.js helper running on
 *      localhost. Start it with `npm install && npm run mail` after copying
 *      .env.example to .env. Works only on the machine running the helper.
 *   2. FORMSPREE_ENDPOINT — optional public fallback so the site still emails
 *      when deployed (e.g. GitHub Pages). Leave the placeholder to skip.
 *   3. mailto: — opens the visitor's email client, used as a last resort.
 */
const ENQUIRY_NOTIFICATION_EMAIL = "juanda.sisnawan@dynamitegames.io";
const LOCAL_MAIL_ENDPOINT = "http://localhost:3000/send";
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT_HERE";

function initEnquiryForm() {
  const form = $("#enquiry-form");
  const feedback = $("#enquiry-feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.classList.remove("success", "error");

    const data = Object.fromEntries(new FormData(form).entries());

    const errors = [];
    if (!data.name || !data.name.trim()) errors.push("name");
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("email");
    if (!data.message || !data.message.trim()) errors.push("message");

    if (errors.length) {
      feedback.textContent = t("enquiry.validation");
      feedback.classList.add("error");
      return;
    }

    const enquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.enquiries) || "[]");
    enquiries.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify(enquiries));

    const sent = await sendEnquiryEmail(data);

    if (sent === "local" || sent === "formspree") {
      feedback.textContent = t("enquiry.success_sent");
      feedback.classList.add("success");
    } else if (sent === "mailto") {
      feedback.textContent = t("enquiry.success_mailto");
      feedback.classList.add("success");
    } else {
      feedback.textContent = t("enquiry.error_email", { email: ENQUIRY_NOTIFICATION_EMAIL });
      feedback.classList.add("error");
      return;
    }

    form.reset();

    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("success");
    }, 6000);
  });
}

async function sendEnquiryEmail(data) {
  if (LOCAL_MAIL_ENDPOINT) {
    try {
      const res = await fetch(LOCAL_MAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return "local";
    } catch (_) { /* helper not running — fall through */ }
  }

  if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT !== "YOUR_FORMSPREE_ENDPOINT_HERE") {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Travel Explorer enquiry from ${data.name}`,
          _replyto: data.email,
          ...data,
        }),
      });
      if (res.ok) return "formspree";
    } catch (_) { /* fall through to mailto */ }
  }

  const subject = `New Travel Explorer enquiry from ${data.name}`;
  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Destination: ${data.destination || "-"}`,
    `Travel Date: ${data.travelDate || "-"}`,
    `Travellers: ${data.travellers || "-"}`,
    "",
    "Message:",
    data.message,
  ];
  const mailto = `mailto:${ENQUIRY_NOTIFICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
  return "mailto";
}

/* =========================================================
 * GUIDE MODAL
 * ========================================================= */

function initModal() {
  const modal = $("#guide-modal");

  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-guide]");
    if (trigger) {
      const id = trigger.getAttribute("data-open-guide");
      openGuide(id);
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeGuide();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeGuide();
  });
}

function openGuide(id) {
  const modal = $("#guide-modal");
  const body = $("#modal-body");
  const c = CITIES.find((x) => x.id === id);
  if (!c) return;

  currentGuideId = id;

  const totalCost = Object.values(c.cost).reduce((sum, v) => sum + v, 0);
  const itinerary = c.itinerary.map((d) => {
    const items = loc(d.items);
    return `
      <div class="itinerary-day">
        <strong>${esc(loc(d.day))}</strong>
        <ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>
    `;
  }).join("");

  const food = loc(c.food).map((f) => `<li>${esc(f)}</li>`).join("");
  const safety = loc(c.safety).map((s) => `<li>${esc(s)}</li>`).join("");
  const photoSpots = loc(c.photoSpots).map((p) => `<li>${esc(p)}</li>`).join("");

  const metaLine = t("modal.meta_line", {
    country: loc(c.country),
    flight: loc(c.flight),
    season: loc(c.season),
  });

  body.innerHTML = `
    ${imgWrap(c.images, loc(c.name), "modal-hero", "eager")}
    <div class="modal-content">
      <span class="country">${esc(metaLine)}</span>
      <h2 id="modal-title">${esc(loc(c.name))}</h2>
      <p class="overview">${esc(loc(c.overview))}</p>

      <h3>${esc(t("modal.itinerary_heading"))}</h3>
      ${itinerary}

      <h3>${esc(t("modal.food_heading"))}</h3>
      <ul>${food}</ul>

      <h3>${esc(t("modal.transport_heading"))}</h3>
      <p>${esc(loc(c.transport))}</p>

      <h3>${esc(t("modal.cost_heading"))}</h3>
      <table class="cost-table">
        ${Object.entries(c.cost).map(([k, v]) => `<tr><td>${esc(t("modal.cost." + k))}</td><td>${sgd(v)}</td></tr>`).join("")}
        <tr class="total"><td>${esc(t("modal.cost.Total"))}</td><td>${sgd(totalCost)}</td></tr>
      </table>

      <h3>${esc(t("modal.safety_heading"))}</h3>
      <ul>${safety}</ul>

      <h3>${esc(t("modal.photos_heading"))}</h3>
      <ul>${photoSpots}</ul>
    </div>
  `;

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-close", modal).focus();
}

function closeGuide() {
  const modal = $("#guide-modal");
  modal.hidden = true;
  document.body.style.overflow = "";
  currentGuideId = null;
}

function refreshOpenGuide() {
  const modal = $("#guide-modal");
  if (!modal || modal.hidden || !currentGuideId) return;
  openGuide(currentGuideId);
}

/* =========================================================
 * THEME TOGGLE (light / dark)
 * ========================================================= */

function initThemeToggle() {
  const btn = $("#theme-toggle");
  if (!btn) return;

  const root = document.documentElement;
  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(STORAGE_KEYS.theme, next); } catch (e) {}
  });

  apply(root.getAttribute("data-theme") || "light");

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", (e) => {
    if (localStorage.getItem(STORAGE_KEYS.theme)) return;
    apply(e.matches ? "dark" : "light");
  });
}

/* =========================================================
 * NAV TOGGLE (mobile)
 * ========================================================= */

function initNavToggle() {
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
}

function initMagnet() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll("[data-magnet]").forEach((el) => {
    const strength = 0.28;
    el.addEventListener("pointermove", (e) => {
      const b = el.getBoundingClientRect();
      const x = e.clientX - (b.left + b.width / 2);
      const y = e.clientY - (b.top + b.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}
