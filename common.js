// 모든 페이지 공통: 도우미 함수, 다크모드, 모바일 메뉴
const $ = s => document.querySelector(s);
const byId = Object.fromEntries(EXCHANGES.map(e => [e.id, e]));
const mono = (e, cls="mono") => `<span class="${cls}" style="background:${e.color};color:${e.fg}">${e.name.slice(0,2).toUpperCase()}</span>`;
const fmtPct = n => (+n.toFixed(4)).toString() + "%";
const fmtNum = n => Math.round(n).toLocaleString("ko-KR");
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,1800)}


/* theme + menu */
$("#themeBtn").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
});
$("#menuBtn").addEventListener("click", () => {
  const m = $("#mobileMenu"), open = !m.classList.contains("open");
  m.classList.toggle("open", open); $("#menuBtn").setAttribute("aria-expanded", open);
});
$("#mobileMenu").addEventListener("click", e => { if (e.target.tagName==="A") { $("#mobileMenu").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded","false"); } });
