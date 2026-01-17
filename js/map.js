function openMap() {
  const lat = 11.735306;
  const lng = 107.645083;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `geo:${lat},${lng}?q=${lat},${lng}`;
  } else {
    window.open(
      `https://www.google.com/maps?q=${lat},${lng}`,
      "_blank"
    );
  }
}
