/* ============================================
   PIQUE STUDIOS — Main JavaScript
   GSAP ScrollTrigger + FAQ Accordion + Mobile Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Navigation ----------
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('is-active');
      mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  // ---------- Header scroll state ----------
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });


  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ---------- GSAP ScrollTrigger Animations ----------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // --- Hero entrance ---
    // Set initial states
    gsap.set(['.hero-heading', '.hero-subheadline', '.btn-enquire-hero'], { opacity: 0, y: 40 });
    gsap.set('.hero-service-strip span', { opacity: 0, y: 20 });
    gsap.set('.hero-watermark', { opacity: 0, scale: 0.9 });

    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .to('.hero-heading', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .to('.hero-subheadline', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .to('.btn-enquire-hero', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to('.hero-service-strip span', { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
      .to('.hero-watermark', { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1');


    // --- Section reveal helper ---
    function revealOnScroll(selector, options = {}) {
      const defaults = {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        start: 'top 85%',
      };
      const config = { ...defaults, ...options };

      gsap.from(selector, {
        y: config.y,
        opacity: config.opacity,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger,
        scrollTrigger: {
          trigger: typeof selector === 'string' ? selector : selector[0],
          start: config.start,
          toggleActions: 'play none none none',
        },
      });
    }


    // --- USP section ---
    revealOnScroll('.usp .section-heading', { stagger: 0 });
    revealOnScroll('.usp-body', { stagger: 0, y: 30 });
    revealOnScroll('.usp-bullets li', { stagger: 0.1, y: 20 });
    gsap.from('.collage-frame-1', {
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.usp-visual', start: 'top 80%' },
    });
    gsap.from('.collage-accent', {
      opacity: 0,
      x: 30,
      y: -30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.usp-visual', start: 'top 75%' },
    });


    // --- Proof section ---
    revealOnScroll('.proof-header', { stagger: 0 });
    revealOnScroll('.proof-point', { stagger: 0.12 });
    revealOnScroll('.testimonial', { stagger: 0.2, y: 40 });


    // --- Work section ---
    revealOnScroll('.work-header', { stagger: 0 });
    gsap.from('.work-tile', {
      opacity: 0,
      y: 60,
      scale: 0.96,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.work-grid', start: 'top 80%' },
    });


    // --- Process section ---
    revealOnScroll('.process-header', { stagger: 0 });
    gsap.from('.process-step', {
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.process-steps', start: 'top 80%' },
    });


    // --- Packages section ---
    revealOnScroll('.packages-header', { stagger: 0 });
    gsap.from('.package-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.packages-grid', start: 'top 80%' },
    });


    // --- FAQ section ---
    revealOnScroll('.faq .section-heading', { stagger: 0 });
    gsap.from('.faq-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    });


    // --- CTA Band ---
    revealOnScroll('.cta-heading', { stagger: 0, y: 40 });
    revealOnScroll('.cta-body', { stagger: 0, y: 30 });
    revealOnScroll('.cta-band .btn', { stagger: 0, y: 20 });
  }
});
