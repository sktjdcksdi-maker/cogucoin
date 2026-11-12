// 거래소 정보(페이백 %, 추천코드, 지급 시간 등) — 메인 페이지와 /payback 페이지가 함께 사용합니다
/* ===== 여기만 고치면 사이트 내용이 바뀝니다 ===== */
// code: 본인 추천 코드 / link: 본인 레퍼럴 가입 링크 / maker·taker: 기본 수수료(%) / payback: 페이백 비율(%)
const EXCHANGES = [
  {id:"gate",    name:"Gate",    ko:"게이트",   color:"#2354E6", fg:"#fff", payback:50, maker:0.02, taker:0.05,  code:"cogugood",    link:"https://www.gate.com/", pick:true, schedule:"거래 시작 후 2시간 이내", scheduleNote:"현물/선물 계좌가 분리된 경우 현물 계좌로, 통합 모드에서는 거래 계좌로 입금됩니다."},
  {id:"toobit",  name:"Toobit",  ko:"투빗",     color:"#111827", fg:"#fff", payback:60, maker:0.02, taker:0.06,  code:"cogu",    link:"https://www.toobit.com/", schedule:"거래 후 약 1시간 30분"},
  {id:"bitget",  name:"Bitget",  ko:"비트겟",   color:"#00C7D4", fg:"#062a2c", payback:30, maker:0.02, taker:0.06, code:"good1004",   link:"https://www.bitget.com/", schedule:"다음 날 오후 4시 30분 이후"},
  {id:"bybit",   name:"Bybit",   ko:"바이비트", color:"#17181E", fg:"#F7A600", payback:20, maker:0.02, taker:0.055, code:"122998", link:"https://www.bybit.com/invite?ref=122998", schedule:"매주 월요일"},
  {id:"okx",     name:"OKX",     ko:"OKX",      color:"#000000", fg:"#fff", payback:20, maker:0.02, taker:0.05,  code:"good12",    link:"https://www.okx.com/", schedule:"약 1시간마다"},
  {id:"binance", name:"Binance", ko:"바이낸스", color:"#F0B90B", fg:"#1E2026", payback:10, maker:0.02, taker:0.05, code:"cogu1004",   link:"https://www.binance.com/", schedule:"거래 후 약 1시간"}
];
// type: "comp"(대회) 또는 "new"(신규 가입) / end 날짜가 지나면 자동으로 숨겨집니다
const EVENTS = [
  {ex:"gate",    type:"comp", title:"11월 선물 개인 거래 대회", prize:"$100,000", start:"2026-11-01", end:"2026-11-30", cond:[["참가 조건","선물 자산 $200 이상"],["거래량","$100,000 이상"]], link:"https://www.gate.com/"},
  {ex:"toobit",  type:"new",  title:"신규 가입 미션 리워드",     prize:"최대 $500",  start:"2026-11-01", end:"2026-12-31", cond:[["대상","신규 가입자"],["방식","미션 달성 시 바우처"]], link:"https://www.toobit.com/"},
  {ex:"bitget",  type:"comp", title:"11월 개인 트레이딩 대회",   prize:"$50,000",   start:"2026-11-01", end:"2026-11-30", cond:[["참가 조건","선물 자산 $100 이상"],["거래량","$200,000 이상"]], link:"https://www.bitget.com/"},
  {ex:"bybit",   type:"new",  title:"첫 입금 리워드",            prize:"20 USDT",   start:"2026-11-03", end:"2026-11-30", cond:[["조건","100 USDT 이상 입금"],["인원","선착순 지급"]], link:"https://www.bybit.com/invite?ref=122998"},
  {ex:"okx",     type:"new",  title:"입금·거래 리워드",          prize:"최대 $200", start:"2026-11-01", end:"2026-11-30", cond:[["대상","신규 가입자"],["방식","입금 후 거래 미션"]], link:"https://www.okx.com/"},
  {ex:"binance", type:"comp", title:"선물 거래량 챌린지",        prize:"$20,000",   start:"2026-11-10", end:"2026-12-10", cond:[["거래량","$50,000 이상"],["참가","신청 필요"]], link:"https://www.binance.com/"}
];
const REF_STEPS = {
  gate:   [["고객센터 채팅 열기","앱 또는 웹 우측 하단의 고객센터를 엽니다."],["추천인 변경 요청","‘추천인 변경’을 요청하고 새 추천 코드 cogugood를 전달합니다."],["처리 확인","변경이 완료되면 COGU 상담 채널에 UID를 남겨 주세요."]],
  toobit: [["고객센터 문의","Toobit 고객센터에 추천인 변경을 요청합니다."],["코드 전달","새 추천 코드 cogu와 본인 UID를 전달합니다."],["완료 확인","처리 후 COGU 상담 채널에 UID를 남겨 주세요."]],
  bitget: [["정책 확인","Bitget은 기존 계정의 추천인 변경을 제한하는 경우가 있습니다."],["고객센터 문의","가능 여부를 고객센터에서 먼저 확인합니다."],["상담 요청","어렵다면 COGU 상담 채널로 문의해 주세요."]],
  bybit:  [["고객센터 문의","Bybit 고객센터에 추천인 변경 가능 여부를 문의합니다."],["코드 전달","가능하다면 새 추천 코드 122998을 전달합니다."],["완료 확인","처리 후 COGU 상담 채널에 UID를 남겨 주세요."]],
  okx:    [["고객센터 문의","OKX 고객센터에 추천인 변경을 요청합니다."],["코드 전달","새 추천 코드 good12와 UID를 전달합니다."],["완료 확인","처리 후 COGU 상담 채널에 UID를 남겨 주세요."]],
  binance:[["정책 확인","Binance는 추천인 변경 조건이 까다로운 편입니다."],["고객센터 문의","가능 여부를 고객센터에서 먼저 확인합니다."],["상담 요청","방법이 막히면 COGU 상담 채널로 문의해 주세요."]]
};
/* ===== 설정 끝 ===== */
