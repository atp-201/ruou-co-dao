document.addEventListener("DOMContentLoaded", () => {
    renderCommonUI();       // 1. Tự động vẽ Header, Footer, Nhạc, Zalo
    initNavActiveState();   // 2. Tự động đánh dấu menu đang xem
    initThemeToggle();      // 3. Kích hoạt Dark Mode
    initMusicPlayer();      // 4. Kích hoạt trình phát nhạc
    initLightbox();         // 5. Kích hoạt xem ảnh phóng to
    initHeaderHide();       // 6. Hiệu ứng ẩn header khi cuộn
    initSeasonalEffects();  // 7. HIỆU ỨNG HOA VÀ TUYẾT RƠI
});

// ==========================================
// 1. TỰ ĐỘNG CHÈN CÁC THÀNH PHẦN CHUNG
// ==========================================
function renderCommonUI() {
    const headerHTML = `
      <header class="site-header" id="header">
        <div class="container">
          <a href="index.html" class="brand">
            <span class="brand-top">Rượu</span>
            <span class="brand-strong">Cô Đào</span>
          </a>
          <nav class="nav">
            <a href="index.html">Trang chủ</a>
            <a href="gioi-thieu.html">Giới thiệu</a>
            <a href="san-pham.html">Sản phẩm</a>
            <a href="lien-he.html">Liên hệ</a>
            <a href="web-khac.html">Web khác</a>
            <button id="themeToggle" style="background:none; border:none; cursor:pointer; font-size:1.1rem; margin-left:10px;" title="Bật/Tắt giao diện tối">🌓</button>
          </nav>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // --- FOOTER (CHÂN TRANG) ---
    const currentYear = new Date().getFullYear();
    const footerHTML = `
      <footer class="site-footer">
        <div class="container">
          <p class="age-warning">⚠️ Thưởng thức có trách nhiệm. Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.</p>
          <p>&copy; ${currentYear} <a href="https://atp-201.github.io/ruou-co-dao/" class="footer-link">Rượu Cô Đào</a></p>
        </div>
      </footer>
    `;

    const mainArea = document.querySelector("main");
    if(mainArea) mainArea.insertAdjacentHTML("afterend", footerHTML);

    const floatingUI = `
      <div class="music-player">
        <button id="musicBtn">🔊 Nhạc</button>
      </div>
      <audio id="bgMusic" loop preload="none">
        <source src="mp3/TinhVeSlowed.mp3" type="audio/mpeg">
      </audio>

      <button id="scrollTopBtn" class="scroll-top-btn" title="Lên đầu trang">⬆️</button>

      <div class="floating-cta">
        <a href="https://zalo.me/0395193922" target="_blank" class="cta-item zalo-color">
          💬 <span>Nhắn Zalo</span>
        </a>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", floatingUI);
}

// ==========================================
// 2. TỰ ĐỘNG ĐÁNH DẤU MENU THEO TRANG
// ==========================================
function initNavActiveState() {
    let currentFile = window.location.pathname.split("/").pop();
    if (!currentFile || currentFile === "") currentFile = "index.html";

    document.querySelectorAll(".nav a").forEach(link => {
        if (link.getAttribute("href") === currentFile) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// ==========================================
// 3. DARK MODE (CHẾ ĐỘ TỐI)
// ==========================================
function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    if (localStorage.getItem("dark-theme") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("dark-theme", isDarkMode ? "enabled" : "disabled");
    });
}

// ==========================================
// 4. TRÌNH PHÁT NHẠC XUYÊN SUỐT
// ==========================================
function initMusicPlayer() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");
    if (!music || !btn) return;

    let isPlaying = localStorage.getItem("music") === "on";
    music.currentTime = parseFloat(sessionStorage.getItem("musicTime")) || 0;

    if (isPlaying) {
        music.play().catch(() => {});
        btn.textContent = "🔇 Tắt nhạc";
    } else {
        btn.textContent = "🔊 Nhạc";
    }

    btn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            btn.textContent = "🔇 Tắt nhạc";
            localStorage.setItem("music", "on");
        } else {
            music.pause();
            btn.textContent = "🔊 Nhạc";
            localStorage.setItem("music", "off");
        }
    });

    setInterval(() => {
        if (!music.paused) sessionStorage.setItem("musicTime", music.currentTime);
    }, 500);

    document.addEventListener("click", function autoPlayOnce() {
        if (localStorage.getItem("music") === "on") music.play().catch(() => {});
        document.removeEventListener("click", autoPlayOnce);
    });
}

// ==========================================
// 5. HIỆU ỨNG PHÓNG TO ẢNH (LIGHTBOX)
// ==========================================
function initLightbox() {
    const images = document.querySelectorAll(".product-img img, .product-card img, .hero-image img");
    if (images.length === 0) return;

    const lightboxHTML = `
      <div id="lightbox" class="lightbox">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" src="" alt="Zoom">
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", lightboxHTML);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    images.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });
}

// ==========================================
// 6. ẨN HEADER KHI CUỘN TRANG XUỐNG
// ==========================================
function initHeaderHide() {
    let lastScroll = 0;
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove("hide");
        } else if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
        lastScroll = currentScroll;
    });
}

// ==========================================
// 7. HIỆU ỨNG HOA RƠI VÀ TUYẾT RƠI THÔNG MINH
// ==========================================
function initSeasonalEffects() {
    const month = new Date().getMonth() + 1;
    const isMobile = window.innerWidth <= 600;

    // --- HOA ANH ĐÀO (Tháng 1 & Tháng 2) ---
    if (month === 1 || month === 2) {
        const petalContainer = document.createElement('div');
        petalContainer.id = 'petals-container';
        petalContainer.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden;';
        document.body.appendChild(petalContainer);

        const P_CONFIG = {
            interval: isMobile ? 900 : 350,
            minDuration: isMobile ? 10 : 6,
            maxDuration: isMobile ? 16 : 9,
            initialCount: isMobile ? 4 : 10
        };

        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const size = Math.random() * 4 + 6;
            const duration = Math.random() * (P_CONFIG.maxDuration - P_CONFIG.minDuration) + P_CONFIG.minDuration;

            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.width = size + 'px';
            petal.style.height = size * 1.3 + 'px';
            petal.style.animationDuration = duration + 's';
            petal.style.opacity = Math.random() * 0.3 + 0.35;
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;

            petalContainer.appendChild(petal);
            setTimeout(() => petal.remove(), (duration + 2) * 1000);
        }

        setInterval(createPetal, P_CONFIG.interval);
        for (let i = 0; i < P_CONFIG.initialCount; i++) setTimeout(createPetal, i * 400);
    }

    // --- TUYẾT RƠI (Tháng 12 & Tháng 1) ---
    if (month === 12 || month === 1) {
        const snowContainer = document.createElement('div');
        snowContainer.id = 'snow-container';
        snowContainer.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden;';
        document.body.appendChild(snowContainer);

        const S_CONFIG = {
            interval: isMobile ? 900 : 300,
            minDuration: isMobile ? 12 : 6,
            maxDuration: isMobile ? 18 : 10,
            minSize: isMobile ? 3 : 4,
            maxSize: isMobile ? 6 : 8,
            initialCount: isMobile ? 5 : 14
        };

        function spawnSnow() {
            const snow = document.createElement('div');
            snow.className = 'snowflake';
            const size = Math.random() * (S_CONFIG.maxSize - S_CONFIG.minSize) + S_CONFIG.minSize;
            const duration = Math.random() * (S_CONFIG.maxDuration - S_CONFIG.minDuration) + S_CONFIG.minDuration;

            snow.style.width = size + 'px';
            snow.style.height = size + 'px';
            snow.style.left = Math.random() * 100 + 'vw';
            snow.style.animationDuration = duration + 's';
            snow.style.opacity = Math.random() * 0.4 + 0.4;

            snowContainer.appendChild(snow);
            setTimeout(() => snow.remove(), (duration + 2) * 1000);
        }

        setInterval(spawnSnow, S_CONFIG.interval);
        for (let i = 0; i < S_CONFIG.initialCount; i++) setTimeout(spawnSnow, i * 350);
    }
}

// ==========================================
// 8. BẢN ĐỒ (DÀNH RIÊNG CHO TRANG LIÊN HỆ)
// ==========================================
window.openMap = function() {
    const lat = 11.735306;
    const lng = 107.645083;
    
    // Đường link Google Maps chính thức chuẩn 100%
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Trên điện thoại: Tự động gọi ứng dụng bản đồ (App) ra
        window.location.href = mapUrl;
    } else {
        // Trên máy tính: Mở tab mới dẫn thẳng đến Google Maps
        window.open(mapUrl, "_blank");
    }
};

// ==========================================
// 9. NÚT CUỘN LÊN ĐẦU TRANG (SCROLL TO TOP)
// ==========================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

    // Hiện nút khi cuộn xuống quá 300px
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // Bấm để cuộn lên mượt mà
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
