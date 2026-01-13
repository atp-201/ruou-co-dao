const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

/* Trạng thái lưu trong trình duyệt */
let isPlaying = localStorage.getItem("music") === "on";

/* Khi load trang */
window.addEventListener("load", () => {
  if (isPlaying) {
    music.play().catch(() => {});
    btn.textContent = "🔇 Tắt nhạc";
  }
});

/* Click nút */
btn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    btn.textContent = "🔇 Tắt nhạc";
    localStorage.setItem("music", "on");
  } else {
    music.pause();
    btn.textContent = "🔊 Nhạc";
    localStorage.setItem("music", "off");
  }
  isPlaying = !isPlaying;
});

/* Tự phát sau click đầu tiên (tránh bị chặn) */
document.addEventListener("click", function autoPlayOnce() {
  if (localStorage.getItem("music") === "on") {
    music.play().catch(() => {});
  }
  document.removeEventListener("click", autoPlayOnce);
});
