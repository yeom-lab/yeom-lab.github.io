/* =========================================================
   공통 머리말(메뉴)과 꼬리말 — 메뉴를 바꾸려면 여기만 수정하세요.
   ========================================================= */
const LAB_NAME = "Laboratory of Bacterial Physiology";
// 맨 위 작은 제목 (원래 사이트의 SNU MEDICINE). 로고 이미지를 쓰려면
// images/logo.png 를 넣고 LOGO_IMG = "images/logo.png" 로 바꾸세요.
const TOP_LINE = ["SNU", "Medicine"];
const LOGO_IMG = "";
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
        ${LOGO_IMG
          ? `<img class="brand-logo" src="${LOGO_IMG}" alt="${TOP_LINE.join(" ")}">`
          : `<span class="brand-top"><span class="t1">${TOP_LINE[0]}</span> <span class="t2">${TOP_LINE[1]}</span></span>`}
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
