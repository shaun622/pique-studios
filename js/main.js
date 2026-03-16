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


    // --- Section reveal helper ---
    function revealOnScroll(selector, options = {}) {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      const defaults = {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.2,
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
          trigger: config.trigger || selector,
          start: config.start,
          toggleActions: 'play none none none',
        },
      });
    }


    // --- Hero entrance ---
    gsap.set(['.hero-heading', '.hero-subheadline', '.btn-enquire-hero'], { opacity: 0, y: 40 });
    gsap.set('.hero-service-strip span', { opacity: 0, y: 20 });

    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .to('.hero-heading', { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' })
      .to('.hero-subheadline', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
      .to('.btn-enquire-hero', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .to('.hero-service-strip span', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3');


    // --- USP section ---
    revealOnScroll('.usp-heading', { stagger: 0, y: 50 });
    revealOnScroll('.usp-body', { stagger: 0, y: 30 });

    // Collage images stagger in with scale
    gsap.from('.usp-img', {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 1,
      stagger: 0.18,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.usp-collage', start: 'top 80%' },
    });

    // Bottom statement
    revealOnScroll('.usp-bottom', { stagger: 0, y: 30 });


    // --- Proof section ---
    revealOnScroll('.proof-left', { stagger: 0, y: 40 });
    revealOnScroll('.proof-right', { stagger: 0, y: 40 });

    // Proof points stagger
    gsap.from('.proof-point', {
      opacity: 0,
      y: 25,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.proof-point', start: 'top 85%' },
    });


    // --- Testimonials ---
    gsap.from('.testimonial-band', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.testimonial-band', start: 'top 85%' },
    });


    // --- Work Speaks ---
    revealOnScroll('.work-scroll-content', { stagger: 0, y: 50 });
    gsap.from('.work-sticky-img', {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.work-sticky-wrap', start: 'top 80%' },
    });


    // --- Process section (How We Work) ---
    revealOnScroll('.process-header', { stagger: 0, y: 40 });
    gsap.from('.process-step', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.25,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.process-steps', start: 'top 80%' },
    });


    // --- Packages section ---
    revealOnScroll('.packages-header', { stagger: 0, y: 40 });
    gsap.from('.package-card', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.packages-grid', start: 'top 80%' },
    });


    // --- Image band ---
    gsap.from('.image-band-item', {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.image-band', start: 'top 85%' },
    });


    // --- FAQ section ---
    revealOnScroll('.faq .section-heading', { stagger: 0, y: 30 });
    gsap.from('.faq-item', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    });


    // --- CTA Band ---
    revealOnScroll('.cta-heading', { stagger: 0, y: 40 });
    revealOnScroll('.cta-body', { stagger: 0, y: 30 });
    revealOnScroll('.cta-band .btn-services', { stagger: 0, y: 20 });


    // --- Footer ---
    gsap.from('.footer-brand', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%' },
    });
    gsap.from('.footer-col', {
      opacity: 0,
      y: 25,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.footer-columns', start: 'top 90%' },
    });
  }
});
