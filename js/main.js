/* ============================================================
   Fulshear Fencing Pros — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- STICKY HEADER ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', expanded);
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---------- TESTIMONIAL CAROUSEL ---------- */
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('.dot-btn');
  if (track && dots.length) {
    let current = 0;
    const slides = track.querySelectorAll('.testimonial-slide');
    const total = slides.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    goTo(0);

    // Auto-advance every 5 seconds
    let timer = setInterval(() => goTo(current + 1), 5000);
    track.closest('.testimonial-wrap')?.addEventListener('mouseenter', () => clearInterval(timer));
    track.closest('.testimonial-wrap')?.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(current + 1), 5000);
    });

    // Touch/swipe support
    let startX = 0;
    const el = track.parentElement;
    el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling?.classList.remove('open');
      });
      // Open clicked (unless it was open)
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- FORM HANDLING ---------- */
  // Post all site forms directly to the Zapier Catch Hook.
  // Using mode:'no-cors' avoids CORS preflight while still delivering
  // the payload; we redirect to thank-you.html on completion.
  const ZAPIER_HOOK = 'https://hooks.zapier.com/hooks/catch/24209228/43yogd0/';

  document.querySelectorAll('form').forEach(form => {
    if (!form.action || !form.action.includes('hooks.zapier.com')) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      // Build URL-encoded body from all named form fields
      const body = new URLSearchParams(new FormData(form)).toString();

      fetch(ZAPIER_HOOK, {
        method: 'POST',
        mode: 'no-cors',   // avoids CORS preflight; response is opaque but data goes through
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
      .then(() => {
        window.location.href = '/thank-you.html';
      })
      .catch(() => {
        if (btn) { btn.textContent = 'Send Request — We\'ll Call You'; btn.disabled = false; }
        alert('Something went wrong. Please call us at (832) 734-9878 or try again.');
      });
    });
  });

  /* ---------- SMOOTH SCROLL FOR ANCHORS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
