import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { startShader } from './shader';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduced = root.classList.contains('reduced');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));

/* ---------- Scroll ----------
   Native scrolling on purpose: a smooth-scroll library interpolates the wheel and
   always feels a beat behind the hand. Only in-page anchors glide. */
const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? null : $(id);
    if (id !== '#top' && !target) return;
    e.preventDefault();
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  }),
);

/* ---------- Hero shader ---------- */
const glCanvas = $<HTMLCanvasElement>('[data-gl]');
const shader = glCanvas && !reduced ? startShader(glCanvas) : null;
if (glCanvas && reduced) glCanvas.style.background = 'radial-gradient(80% 70% at 70% 30%, #2a2360, #0b0b0d 70%)';

/* ---------- Preloader → intro ---------- */
function intro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to('.hero__title .line__in', { y: 0, duration: 1.6, stagger: 0.12 })
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, '-=1.1')
    // clearProps hands the transform back to CSS so the hide-on-scroll class keeps working.
    .fromTo('.nav', { y: -30, autoAlpha: 0, transition: 'none' }, { y: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, '-=1.2');
  return tl;
}

function runLoader() {
  const loader = $('.loader');
  const count = $('[data-count]');
  if (!loader || reduced) {
    document.body.classList.remove('is-loading');
    return;
  }
  // Short on purpose: the page is ready almost at once, so a long counter only reads as slowness.
  const state = { v: 0 };
  const tl = gsap.timeline();
  tl.to(state, {
    v: 100,
    duration: 0.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (count) count.textContent = String(Math.round(state.v));
    },
  })
    .to('.loader__bar span', { width: '100%', duration: 0.8, ease: 'power2.inOut' }, 0)
    .to('.loader__inner', { yPercent: -120, opacity: 0, duration: 0.4, ease: 'power3.in' })
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' }, '-=0.15')
    .add(() => {
      document.body.classList.remove('is-loading');
      loader.remove();
      ScrollTrigger.refresh();
    })
    .add(intro(), '-=0.45');
}

/* ---------- Rotating roles ---------- */
function roles() {
  const items = $$('.roles__item');
  if (items.length < 2 || reduced) return;
  let i = 0;
  setInterval(() => {
    const cur = items[i];
    i = (i + 1) % items.length;
    const next = items[i];
    gsap.to(cur, { yPercent: -110, duration: 0.7, ease: 'expo.inOut' });
    gsap.fromTo(next, { yPercent: 110 }, { yPercent: 0, y: 0, duration: 0.7, ease: 'expo.inOut' });
  }, 2200);
}

/* ---------- Scroll animations ---------- */
function scrollFx() {
  if (reduced) return;

  // Hero parallax + shader fade
  gsap.to('.hero__content', {
    yPercent: -18,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (st) => shader?.setFade(1 - st.progress * 0.8),
  });

  // Generic reveals
  $$('[data-reveal]').forEach((el) =>
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 97%' },
    }),
  );

  // Headings split into characters
  $$('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'chars,words', mask: 'chars' });
    gsap.from(split.chars, {
      yPercent: 110,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.012,
      scrollTrigger: { trigger: el, start: 'top 95%' },
    });
  });

  // Statement fills in word by word while scrolling
  const statement = $('[data-words]');
  if (statement) {
    const split = SplitText.create(statement, { type: 'words', wordsClass: 'w' });
    gsap.to(split.words, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  }

  // Photo: a short fade that starts as soon as it peeks in. A long reveal reads as a slow-loading image.
  const photo = $('[data-photo]');
  if (photo) {
    gsap.from(photo.querySelector('.about__photo-mask'), {
      autoAlpha: 0,
      scale: 0.97,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: photo, start: 'top bottom' },
    });
  }

  // Counters
  $$<HTMLElement>('[data-counter]').forEach((el) => {
    const end = Number(el.dataset.counter);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });

  // Timeline line draws itself
  const line = $('[data-line]');
  if (line) {
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 70%', scrub: true },
    });
  }

  // Giant name at the bottom slides in
  gsap.fromTo('[data-bigname]', { xPercent: 12 }, {
    xPercent: -4,
    ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: true },
  });
}

/* ---------- Horizontal project scroller ---------- */
function work() {
  const section = $('.work');
  const pin = $('[data-work]');
  const track = $('[data-track]');
  const bar = $('[data-progress]');
  if (!section || !pin || !track) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.remove('is-static');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (st) => bar && gsap.set(bar, { scaleX: st.progress }),
      },
    });
    // Cards rise in as they enter from the right
    $$('[data-card]').forEach((card) => {
      gsap.from(card, {
        y: 80,
        rotate: 2,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 60%', scrub: true },
      });
    });
    return () => section.classList.add('is-static');
  });
  mm.add('(max-width: 860px), (prefers-reduced-motion: reduce)', () => {
    section.classList.add('is-static');
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? track.scrollLeft / max : 0})`;
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  });
}

/* ---------- Marquee reacting to scroll velocity ---------- */
function marquee() {
  const row = $('[data-marquee]');
  if (!row || reduced) return;
  const loop = gsap.to(row, { xPercent: -50, duration: 40, ease: 'none', repeat: -1, paused: true });
  // One reusable tween eases the speed back down instead of creating new tweens on every scroll event.
  const speed = { v: 1 };
  const settle = gsap.to(speed, { v: 1, duration: 1.2, ease: 'power2.out', paused: true, onUpdate: () => { loop.timeScale(speed.v); } });
  ScrollTrigger.create({
    trigger: row,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (st) => (st.isActive ? loop.play() : loop.pause()),
    onUpdate: (st) => {
      speed.v = (st.direction || 1) * (1 + Math.min(Math.abs(st.getVelocity()) / 400, 4));
      loop.timeScale(speed.v);
      settle.invalidate().restart();
    },
  });
}

/* ---------- Pointer niceties ---------- */
function pointer() {
  if (!finePointer || reduced) return;
  root.classList.add('has-cursor');
  const cursor = $('.cursor')!;
  const dot = $('.cursor__dot')!;
  const ring = $('.cursor__ring')!;
  const label = ring.querySelector('em')!;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  });
  $$('a, button').forEach((el) => {
    el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
  });
  const track = $('[data-track]');
  if (track) {
    label.textContent = root.lang === 'es' ? 'Desliza' : 'Scroll';
    track.addEventListener('pointerenter', () => cursor.classList.add('is-drag'));
    track.addEventListener('pointerleave', () => cursor.classList.remove('is-drag'));
  }

  // Magnetic elements
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  // 3D tilt on project cards
  $$('[data-tilt]').forEach((el) => {
    const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
    const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ryTo(px * 8); rxTo(-py * 8);
    });
    el.addEventListener('pointerleave', () => { rxTo(0); ryTo(0); });
  });

  // Spotlight on skill cards
  $$('[data-glow]').forEach((el) =>
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }),
  );
}

/* ---------- Nav: frosted after the hero, hides on scroll down ---------- */
function nav() {
  const el = $('[data-nav]');
  if (!el) return;
  let last = 0;
  const onScroll = (y: number) => {
    el.classList.toggle('is-scrolled', y > 40);
    el.classList.toggle('is-hidden', y > last && y > window.innerHeight * 0.8);
    last = y;
  };
  window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
}

/* ---------- Copy email ---------- */
function copy() {
  $$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const span = btn.querySelector('span')!;
    const original = span.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        span.textContent = btn.dataset.copied!;
        setTimeout(() => (span.textContent = original), 1800);
      } catch {
        window.location.href = `mailto:${btn.dataset.copy}`;
      }
    });
  });
}

document.fonts.ready.then(() => {
  runLoader();
  roles();
  scrollFx();
  work();
  marquee();
  pointer();
  nav();
  copy();
  if (reduced) gsap.set('.hero__title .line__in, [data-hero-fade], [data-reveal]', { clearProps: 'all' });
});
