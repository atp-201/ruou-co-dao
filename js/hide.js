document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

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

(function () {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const month = new Date().getMonth() + 1;
    if (month < 1 || month > 2) return;

    const isMobile = window.innerWidth <= 600;

    // ⚙️ Cấu hình theo thiết bị
    const CONFIG = {
        interval: isMobile ? 900 : 350,   // mobile thưa hơn
        minDuration: isMobile ? 10 : 6,   // mobile rơi chậm
        maxDuration: isMobile ? 16 : 9,
        initialCount: isMobile ? 4 : 10   // mobile ít hoa lúc đầu
    };

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 4 + 6;
        const duration =
            Math.random() * (CONFIG.maxDuration - CONFIG.minDuration)
            + CONFIG.minDuration;

        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = size + 'px';
        petal.style.height = size * 1.3 + 'px';
        petal.style.animationDuration = duration + 's';
        petal.style.opacity = Math.random() * 0.3 + 0.35;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(petal);

        setTimeout(() => petal.remove(), (duration + 2) * 1000);
    }

    // 🌬️ Tạo hoa rơi đều, chậm
    setInterval(createPetal, CONFIG.interval);

    // 🌸 Hoa ban đầu (rất nhẹ trên mobile)
    for (let i = 0; i < CONFIG.initialCount; i++) {
        setTimeout(createPetal, i * 400);
    }
})();

(function () {
  const snowContainer = document.getElementById('snow-container');
  if (!snowContainer) return;

  /* ❄️ CHỈ HIỆN GIÁNG SINH (THÁNG 12 & 1) */
  const month = new Date().getMonth() + 1;
  if (!(month === 12 || month === 1)) return;

  const isMobile = window.innerWidth <= 600;

  // ⚙️ Cấu hình theo thiết bị
  const CONFIG = {
    interval: isMobile ? 900 : 300,     // mobile thưa hơn
    minDuration: isMobile ? 12 : 6,     // mobile rơi chậm
    maxDuration: isMobile ? 18 : 10,
    minSize: isMobile ? 3 : 4,
    maxSize: isMobile ? 6 : 8,
    initialCount: isMobile ? 5 : 14
  };

  function spawnSnow() {
    const snow = document.createElement('div');
    snow.className = 'snowflake';

    const size =
      Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;

    const duration =
      Math.random() * (CONFIG.maxDuration - CONFIG.minDuration)
      + CONFIG.minDuration;

    snow.style.width = size + 'px';
    snow.style.height = size + 'px';
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.animationDuration = duration + 's';
    snow.style.opacity = Math.random() * 0.4 + 0.4;

    snowContainer.appendChild(snow);

    setTimeout(() => snow.remove(), (duration + 2) * 1000);
  }

  /* ❄️ Tuyết rơi đều */
  setInterval(spawnSnow, CONFIG.interval);

  /* ❄️ Tuyết ban đầu */
  for (let i = 0; i < CONFIG.initialCount; i++) {
    setTimeout(spawnSnow, i * 350);
  }
})();

