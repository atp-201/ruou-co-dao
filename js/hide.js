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

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 6 + 6;
        const duration = Math.random() * 3 + 4;

        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = size + 'px';
        petal.style.height = size * 1.3 + 'px';
        petal.style.animationDuration = duration + 's';
        petal.style.opacity = Math.random() * 0.4 + 0.4;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(petal);

        setTimeout(() => petal.remove(), (duration + 1) * 1000);
    }

    setInterval(createPetal, 220);

    for (let i = 0; i < 12; i++) {
        setTimeout(createPetal, i * 120);
    }
})();

const snowContainer = document.getElementById('snow-container');

function spawnSnow() {
  /* CHỈ HIỆN DỊP GIÁNG SINH (Tháng 12 – 1) */
    const month = new Date().getMonth() + 1;
    if (month < 12 || month > 1) return;

  const snow = document.createElement('div');
  snow.className = 'snowflake';

  const size = Math.random() * 5 + 3;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 6 + 4;

  snow.style.width = size + 'px';
  snow.style.height = size + 'px';
  snow.style.left = startX + 'px';
  snow.style.animationDuration = duration + 's';

  snowContainer.appendChild(snow);

  snow.addEventListener('animationend', () => {
    snow.remove();
  });
}

const snowTimer = setInterval(spawnSnow, 250);
