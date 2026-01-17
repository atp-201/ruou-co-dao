// ===== NĂM FOOTER (tự nhận tất cả span id bắt đầu bằng "year") =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

// ===== ẨN / HIỆN HEADER KHI CUỘN =====
let lastScroll = 0;
const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("hide");
      lastScroll = 0;
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });
}
