/* =========================================================
   공통 머리말(메뉴)과 꼬리말 — 메뉴를 바꾸려면 여기만 수정하세요.
   ========================================================= */
const LAB_NAME = "Laboratory of Bacterial Physiology";
const LOGO = "images/logo.jpg";   // 로고 파일
// images 폴더에 파일이 없을 때 임시로 기존 Wix 사이트의 이미지를 불러옵니다.
// (Wix 사이트를 닫기 전에 이미지를 images 폴더에 저장해 두세요.)
const LOGO_FALLBACK = "https://static.wixstatic.com/media/2c36ff_04457c0f1efb4724a0f5949392546292~mv2.jpg/v1/crop/x_89,y_0,w_500,h_76/fill/w_343,h_52,al_c,q_80/logo.jpg";
const MENU = [
  ["Research", "index.html"],
  ["Publications", "publications.html"],
  ["People", "people.html"],
  ["Join the Lab", "join.html"],
  ["Gallery", "gallery.html"],
  ["Contact", "contact.html"],
];
const FOOTER = "© " + new Date().getFullYear() + " Yeom Lab. All rights reserved.";

(function () {
  const here = location.pathname.split("/").pop() || "index.html";

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="index.html">
        <img src="${LOGO}" alt="Yeom Lab logo" onerror="this.onerror=null;this.src='${LOGO_FALLBACK}'">
        <span class="lab-name">${LAB_NAME}</span>
      </a>
      <button class="menu-btn" aria-label="메뉴 열기">☰</button>
      <nav class="nav"><ul>
        ${MENU.map(([t, h]) => `<li><a href="${h}"${h === here ? ' class="active"' : ""}>${t}</a></li>`).join("")}
      </ul></nav>
    </div>`;
  document.body.prepend(header);
  header.querySelector(".menu-btn").addEventListener("click", () =>
    header.querySelector(".nav").classList.toggle("open"));

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.textContent = FOOTER;
  document.body.append(footer);

  /* ---------- 슬라이드쇼 ---------- */
  document.querySelectorAll(".slideshow").forEach((box) => {
    const slides = [...box.querySelectorAll(".slide")];
    const count = box.parentElement.querySelector(".slide-count");
    let i = 0, timer;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("show", k === i));
      if (count) count.textContent = `${i + 1} / ${slides.length}`;
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 5000); };
    box.querySelector(".prev").onclick = () => { show(i - 1); auto(); };
    box.querySelector(".next").onclick = () => { show(i + 1); auto(); };
    show(0); auto();
  });

  /* ---------- 갤러리 확대 보기 ---------- */
  const gallery = document.querySelector(".gallery");
  if (gallery) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<button aria-label="닫기">×</button><img alt=""><p></p>`;
    document.body.append(lb);
    const close = () => lb.classList.remove("open");
    lb.addEventListener("click", (e) => { if (e.target !== lb.querySelector("img")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    gallery.querySelectorAll("figure").forEach((f) => {
      f.addEventListener("click", () => {
        const img = f.querySelector("img");
        lb.querySelector("img").src = img.src;
        lb.querySelector("p").textContent = f.querySelector("figcaption")?.textContent || "";
        lb.classList.add("open");
      });
    });
  }
})();
