document.addEventListener('DOMContentLoaded', function () {
  // Create overlay in <body>
  const overlay = document.createElement('div');
  overlay.className = 'slider-popup';
  overlay.setAttribute('tabindex', '-1');

  overlay.innerHTML = `
    <div class="slider-close" role="button" aria-label="Close overlay">✕</div>
    <img class="slider-img" alt="Zoomed image">
  `;

  document.body.appendChild(overlay);

  const popup    = overlay;
  const popupImg = overlay.querySelector('.slider-img');
  const closeBtn = overlay.querySelector('.slider-close');

  const openPopup = (imgEl) => {
    popupImg.src = imgEl.src;
    popupImg.classList.remove('zoomed');
    popup.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    popup.focus();
  };

  const closePopup = () => {
    popup.classList.remove('show');
    popupImg.classList.remove('zoomed');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => openPopup(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopup(img);
      }
    });
  });

  popupImg.addEventListener('click', () => popupImg.classList.toggle('zoomed'));
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
  document.addEventListener('keydown', (e) => { if (popup.classList.contains('show') && e.key === 'Escape') closePopup(); });
  popup.addEventListener('wheel', closePopup, { passive: true });
  window.addEventListener('scroll', () => { if (popup.classList.contains('show')) closePopup(); }, { passive: true });
  window.addEventListener('blur',  () => { if (popup.classList.contains('show')) closePopup(); });
});
