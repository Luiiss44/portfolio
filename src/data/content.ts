// Todo el texto de la web, en castellano e inglés. Un solo sitio para editarlo.
export type Lang = 'es' | 'en';

export const site = {
  name: 'Luis Marquina Rodríguez',
  short: 'Luis Marquina',
  email: 'lmrodriguez2017@gmail.com',
  github: 'https://github.com/Luiiss44',
  linkedin: 'https://www.linkedin.com/in/luismarrod',
  url: 'https://luis.inmovira.com',
};

const es = {
  htmlLang: 'es',
  meta: {
    title: 'Luis Marquina — Ingeniero de software full-stack · IA aplicada',
    description:
      'Ingeniero de software full-stack. Construyo productos con IA en producción: Zeonida (asistente jurídico en Rust + React) e Inmovira (SaaS inmobiliario). Madrid.',
  },
  nav: { work: 'Proyectos', about: 'Perfil', experience: 'Trayectoria', contact: 'Contacto', cv: 'CV', other: 'EN', otherHref: '/en/' },
  loader: 'Cargando portfolio',
  hero: {
    eyebrow: 'Ingeniero de software · Madrid',
    lines: ['Construyo', 'software que', 'piensa.'],
    roles: ['Full-stack', 'IA aplicada', 'Rust · TypeScript', 'Datos', 'Producto'],
    lead:
      'Diseño, programo y despliego productos completos: del modelo de datos y la seguridad a la interfaz. Dos SaaS con IA en producción en 2026.',
    ctaWork: 'Ver proyectos',
    ctaCv: 'Descargar CV',
    scroll: 'Desliza',
    available: 'Disponible para nuevos proyectos',
  },
  about: {
    label: 'Perfil',
    statement:
      'Me gusta llevar ideas a producción. Trabajo en todo el stack — Rust, TypeScript, Python y SQL — con obsesión por la seguridad, la privacidad de los datos y los detalles que el usuario nota.',
    body:
      'Lidero el desarrollo técnico de Zeonida, un asistente de IA para procuradores y abogados que nunca guarda los datos del cliente, y he construido Inmovira, un SaaS inmobiliario que rastrea portales cada hora y verifica a los particulares con IA. Formación en Ingeniería de Software (U-tad, especialidad en Ingeniería de Datos) y en 42 Madrid.',
    stats: [
      { value: 2, suffix: '', label: 'productos SaaS en producción' },
      { value: 500, suffix: '+', label: 'commits en 2026' },
      { value: 24, suffix: 'h', label: 'rastreo continuo de portales' },
      { value: 0, suffix: '', label: 'datos personales que ve la IA de Zeonida' },
    ],
  },
  work: {
    label: 'Proyectos seleccionados',
    title: 'Lo que he construido',
    hint: 'Arrastra o desliza',
    visit: 'Visitar',
    code: 'Código',
  },
  projects: [
    {
      id: 'zeonida',
      name: 'Zeonida',
      year: '2026',
      role: 'Cofundador · Ingeniero de software',
      tagline: 'Asistente de IA para procuradores y abogados. El despacho guarda; Zeonida piensa y olvida.',
      bullets: [
        'Backend en Rust (Axum, Tokio, sqlx) y web en React 19 + TypeScript; versión 1.0.0 en producción en zeonida.com.',
        'Seudonimización impuesta por el sistema de tipos: el modelo solo acepta texto seudonimizado. Núcleo compilado a WASM para un modo privado en el navegador.',
        'Reconocimiento de nombres con XLM-RoBERTa en ONNX Runtime, OCR con Tesseract y cómputo de plazos procesales (LEC, LOPJ) con los festivos de cada partido judicial.',
      ],
      stack: ['Rust', 'Axum', 'React 19', 'TypeScript', 'PostgreSQL', 'WASM', 'ONNX', 'Docker'],
      image: '/img/zeonida.webp',
      url: 'https://zeonida.com',
      repo: '',
      accent: '#c9a45c',
    },
    {
      id: 'inmovira',
      name: 'Inmovira',
      year: '2026',
      role: 'Fundador · Ingeniero full-stack',
      tagline: 'SaaS inmobiliario: detecta viviendas de particulares y las convierte en captaciones.',
      bullets: [
        'Motor de rastreo que monitoriza varios portales cada hora con proxies por país y un pipeline de IA en dos niveles que verifica a los anunciantes particulares.',
        'CRM multi-tenant con aislamiento por agencia, alertas en tiempo real por WhatsApp (Gemini) e historial de precios por vivienda.',
        'API en Express 5 + TypeScript con Zod estricto, JWT con rotación de refresh tokens, CSP y despliegue propio en VPS.',
      ],
      stack: ['TypeScript', 'Express 5', 'Astro', 'Turso', 'Gemini', 'WhatsApp', 'Tailwind'],
      image: '/img/inmovira.webp',
      url: 'https://inmovira.com',
      repo: '',
      accent: '#d8b77a',
    },
    {
      id: 'skyline',
      name: 'Skyline Logistics',
      year: '2025',
      role: 'Proyecto académico',
      tagline: 'Simulación logística en Java con arquitectura limpia por capas.',
      bullets: ['Patrones de diseño Singleton, DAO y Strategy.', 'Separación estricta de dominio, persistencia y presentación.'],
      stack: ['Java', 'POO', 'Patrones GoF', 'UML'],
      image: '',
      url: '',
      repo: 'https://github.com/Luiiss44/skyline-logistics',
      accent: '#7c9cff',
    },
    {
      id: 'movieapp',
      name: 'MovieApp',
      year: '2025',
      role: 'App Android',
      tagline: 'App Android con arquitectura MVVM, API de TMDB y favoritos en Firebase.',
      bullets: ['Kotlin, Jetpack y corrutinas.', 'Consumo de API REST y persistencia en la nube.'],
      stack: ['Kotlin', 'Jetpack', 'MVVM', 'Firebase'],
      image: '',
      url: '',
      repo: 'https://github.com/Luiiss44/MovieApp',
      accent: '#b38cff',
    },
    {
      id: 'campus42',
      name: 'Campus 42',
      year: '2023 — 2025',
      role: '42 Madrid · Fundación Telefónica',
      tagline: 'Cursus de programación en C: libft, push_swap, ft_printf y más.',
      bullets: ['Algoritmos y estructuras de datos sin librerías.', 'Aprendizaje entre pares y evaluación por proyectos.'],
      stack: ['C', 'Algoritmos', 'Makefile', 'Bash'],
      image: '',
      url: '',
      repo: 'https://github.com/Luiiss44/Telefonica42',
      accent: '#5ee6c8',
    },
  ],
  experience: {
    label: 'Trayectoria',
    title: 'Experiencia y formación',
    items: [
      {
        when: 'Oct 2026 — hoy',
        what: 'Cofundador · Ingeniero de software',
        where: 'Zeonida — LegalTech',
        text: 'Arquitectura y desarrollo del asistente jurídico sin estado: API en Rust, web en React, seudonimización, IA en servidores europeos, despliegue continuo y observabilidad.',
      },
      {
        when: 'Jul 2026 — hoy',
        what: 'Fundador · Ingeniero full-stack',
        where: 'Inmovira — PropTech',
        text: 'Producto completo en producción: scraper distribuido, pipeline de IA, CRM multi-tenant, bot de WhatsApp y web pública.',
      },
      {
        when: '2021 — 2027',
        what: 'Grado en Ingeniería de Software',
        where: 'U-tad · Madrid',
        text: 'Especialidad en Ingeniería de Datos: modelado, pipelines, IA, visión por computador, sistemas de recomendación e IoT.',
      },
      {
        when: '2023 — 2025',
        what: 'Programación intensiva',
        where: '42 Madrid · Fundación Telefónica',
        text: 'Metodología peer-to-peer basada en proyectos: C, algoritmos, sistemas y trabajo en equipo.',
      },
    ],
  },
  skills: {
    label: 'Stack',
    title: 'Herramientas con las que trabajo',
    groups: [
      { name: 'Lenguajes', items: ['Rust', 'TypeScript', 'Python', 'JavaScript', 'Java', 'Kotlin', 'C', 'SQL', 'Bash'] },
      { name: 'Frontend', items: ['React', 'Next.js', 'Astro', 'TanStack', 'Tailwind CSS', 'GSAP'] },
      { name: 'Backend', items: ['Axum', 'FastAPI', 'Node.js', 'Express', 'REST', 'OpenAPI', 'WebSockets'] },
      { name: 'Datos e IA', items: ['PostgreSQL', 'pgvector', 'ONNX Runtime', 'LLMs', 'Pandas', 'TensorFlow', 'Spark'] },
      { name: 'Infra', items: ['Docker', 'Cloudflare', 'GitHub Actions', 'Linux / VPS', 'Sentry', 'Vercel'] },
      { name: 'Seguridad', items: ['AES-256-GCM', 'JWT', 'CSP', 'Zod', 'RLS', 'Privacidad por diseño'] },
    ],
  },
  contact: {
    label: 'Contacto',
    title: ['¿Hablamos?'],
    lead: 'Abierto a puestos de ingeniería de software, full-stack e IA. Escríbeme y te respondo pronto.',
    copy: 'Copiar email',
    copied: '¡Copiado!',
    cv: 'Descargar CV (PDF)',
    cvHref: '/cv/CV_Luis_Marquina_Rodriguez.pdf',
  },
  footer: { made: 'Diseñado y programado por Luis Marquina', top: 'Volver arriba' },
};

const en: typeof es = {
  htmlLang: 'en',
  meta: {
    title: 'Luis Marquina — Full-stack software engineer · Applied AI',
    description:
      'Full-stack software engineer. I build AI products in production: Zeonida (legal assistant in Rust + React) and Inmovira (real estate SaaS). Madrid, Spain.',
  },
  nav: { work: 'Work', about: 'About', experience: 'Journey', contact: 'Contact', cv: 'CV', other: 'ES', otherHref: '/' },
  loader: 'Loading portfolio',
  hero: {
    eyebrow: 'Software engineer · Madrid',
    lines: ['I build', 'software that', 'thinks.'],
    roles: ['Full-stack', 'Applied AI', 'Rust · TypeScript', 'Data', 'Product'],
    lead:
      'I design, build and ship complete products: from the data model and security to the interface. Two AI-powered SaaS products in production in 2026.',
    ctaWork: 'See my work',
    ctaCv: 'Download CV',
    scroll: 'Scroll',
    available: 'Open to new opportunities',
  },
  about: {
    label: 'About',
    statement:
      'I love taking ideas to production. I work across the stack — Rust, TypeScript, Python and SQL — obsessed with security, data privacy and the details users notice.',
    body:
      'I lead the technical development of Zeonida, an AI assistant for Spanish court representatives and lawyers that never stores client data, and I built Inmovira, a real estate SaaS that crawls listing portals every hour and verifies private sellers with AI. Background in Software Engineering (U-tad, Data Engineering track) and 42 Madrid.',
    stats: [
      { value: 2, suffix: '', label: 'SaaS products in production' },
      { value: 500, suffix: '+', label: 'commits in 2026' },
      { value: 24, suffix: 'h', label: 'continuous portal crawling' },
      { value: 0, suffix: '', label: 'personal data seen by Zeonida’s AI' },
    ],
  },
  work: { label: 'Selected work', title: 'Things I’ve built', hint: 'Drag or scroll', visit: 'Visit', code: 'Code' },
  projects: [
    {
      ...es.projects[0],
      role: 'Co-founder · Software engineer',
      tagline: 'AI assistant for court representatives and lawyers. The firm keeps the data; Zeonida thinks and forgets.',
      bullets: [
        'Rust backend (Axum, Tokio, sqlx) and React 19 + TypeScript web app; version 1.0.0 live at zeonida.com.',
        'Pseudonymisation enforced by the type system: the model port only accepts pseudonymised text. Core compiled to WASM for an in-browser private mode.',
        'Named-entity recognition with XLM-RoBERTa on ONNX Runtime, Tesseract OCR and procedural deadline computation with each judicial district’s holidays.',
      ],
    },
    {
      ...es.projects[1],
      role: 'Founder · Full-stack engineer',
      tagline: 'Real estate SaaS: finds homes listed by private sellers and turns them into leads.',
      bullets: [
        'Crawler that monitors several listing portals every hour through per-country proxies, plus a two-stage AI pipeline that verifies private sellers.',
        'Multi-tenant CRM with per-agency isolation, real-time WhatsApp alerts (Gemini) and price history per property.',
        'Express 5 + TypeScript API with strict Zod validation, rotating refresh tokens, CSP and self-managed VPS deployment.',
      ],
    },
    { ...es.projects[2], role: 'Academic project', tagline: 'Logistics simulation in Java with a clean layered architecture.', bullets: ['Singleton, DAO and Strategy design patterns.', 'Strict separation of domain, persistence and presentation.'], stack: ['Java', 'OOP', 'GoF patterns', 'UML'] },
    { ...es.projects[3], role: 'Android app', tagline: 'Android app with MVVM architecture, the TMDB API and Firebase favourites.', bullets: ['Kotlin, Jetpack and coroutines.', 'REST API consumption and cloud persistence.'] },
    { ...es.projects[4], tagline: 'C programming curriculum: libft, push_swap, ft_printf and more.', bullets: ['Algorithms and data structures from scratch.', 'Peer learning and project-based evaluation.'], stack: ['C', 'Algorithms', 'Makefile', 'Bash'] },
  ],
  experience: {
    label: 'Journey',
    title: 'Experience & education',
    items: [
      { when: 'Oct 2026 — now', what: 'Co-founder · Software engineer', where: 'Zeonida — LegalTech', text: 'Architecture and development of the stateless legal assistant: Rust API, React web app, pseudonymisation, AI on European servers, continuous deployment and observability.' },
      { when: 'Jul 2026 — now', what: 'Founder · Full-stack engineer', where: 'Inmovira — PropTech', text: 'Complete product in production: distributed scraper, AI pipeline, multi-tenant CRM, WhatsApp bot and public website.' },
      { when: '2021 — 2027', what: 'BSc Software Engineering', where: 'U-tad · Madrid', text: 'Data Engineering track: data modelling, pipelines, AI, computer vision, recommender systems and IoT.' },
      { when: '2023 — 2025', what: 'Intensive programming', where: '42 Madrid · Telefónica Foundation', text: 'Peer-to-peer, project-based methodology: C, algorithms, systems and teamwork.' },
    ],
  },
  skills: {
    label: 'Stack',
    title: 'Tools I work with',
    groups: [
      { name: 'Languages', items: es.skills.groups[0].items },
      { name: 'Frontend', items: es.skills.groups[1].items },
      { name: 'Backend', items: es.skills.groups[2].items },
      { name: 'Data & AI', items: es.skills.groups[3].items },
      { name: 'Infra', items: es.skills.groups[4].items },
      { name: 'Security', items: ['AES-256-GCM', 'JWT', 'CSP', 'Zod', 'RLS', 'Privacy by design'] },
    ],
  },
  contact: {
    label: 'Contact',
    title: ['Let’s talk.'],
    lead: 'Open to software engineering, full-stack and AI roles. Drop me a line.',
    copy: 'Copy email',
    copied: 'Copied!',
    cv: 'Download CV (PDF)',
    cvHref: '/cv/CV_Luis_Marquina_Rodriguez_EN.pdf',
  },
  footer: { made: 'Designed and built by Luis Marquina', top: 'Back to top' },
};

export const content = { es, en };
