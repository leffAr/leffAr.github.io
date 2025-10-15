// Toggle mobile menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Close menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('nav-active');
    }
  });
});

// Contact form alert
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    form.reset();
  });
}
// === PROTEKSI DASAR (KOSMETIK – VERSI ELEGAN) ===
// Catatan: Ini hanya proteksi visual, bukan keamanan mutlak.

// Fungsi untuk menampilkan notifikasi elegan di layar
function showSecurityNotice(message) {
  // Jika sudah ada notifikasi aktif, hapus dulu
  const existing = document.querySelector('.security-notice');
  if (existing) existing.remove();

  const notice = document.createElement('div');
  notice.className = 'security-notice';
  notice.textContent = message;
  document.body.appendChild(notice);

  // Tambahkan style (langsung lewat JS agar tidak mudah dihapus)
  notice.style.position = 'fixed';
  notice.style.bottom = '30px';
  notice.style.right = '30px';
  notice.style.background = 'rgba(0,0,0,0.8)';
  notice.style.color = '#fff';
  notice.style.padding = '12px 20px';
  notice.style.borderRadius = '10px';
  notice.style.fontFamily = 'sans-serif';
  notice.style.fontSize = '14px';
  notice.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
  notice.style.zIndex = '9999';
  notice.style.opacity = '0';
  notice.style.transition = 'opacity 0.3s ease';

  // Animasi fade in
  setTimeout(() => notice.style.opacity = '1', 50);

  // Hilang otomatis setelah 3 detik
  setTimeout(() => {
    notice.style.opacity = '0';
    setTimeout(() => notice.remove(), 500);
  }, 3000);
}

// Nonaktifkan klik kanan
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  showSecurityNotice('⚠️ Klik kanan dinonaktifkan untuk melindungi kode.');
});

// Nonaktifkan shortcut tertentu
document.addEventListener('keydown', (e) => {
  try {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      showSecurityNotice('🔒 Developer Tools dibatasi.');
      return;
    }

    // Ctrl+Shift+I atau Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) {
      e.preventDefault();
      showSecurityNotice('🚫 Akses DevTools tidak diizinkan.');
      return;
    }

    // Ctrl+U (lihat source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      showSecurityNotice('❌ Melihat kode sumber tidak diperbolehkan.');
      return;
    }
  } catch (err) {
    console.warn('Proteksi dasar error:', err);
  }
});

