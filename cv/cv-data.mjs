// Contenido del CV en castellano e inglés. build-cv.mjs lo convierte en PDF.
// El teléfono solo aparece en la versión privada (la que se envía a empresas),
// nunca en la que se publica en la web. Se lee de cv/private.json, que Git ignora:
// el repositorio es público.
import { existsSync, readFileSync } from 'node:fs';

const privateFile = new URL('./private.json', import.meta.url);
const priv = existsSync(privateFile) ? JSON.parse(readFileSync(privateFile, 'utf8')) : {};

export const contact = {
  name: 'Luis Marquina Rodríguez',
  email: 'lmrodriguez2017@gmail.com',
  phone: priv.phone ?? '',
  web: 'luis.inmovira.com',
  github: 'github.com/Luiiss44',
  linkedin: 'linkedin.com/in/luismarrod',
};

export const cv = {
  es: {
    lang: 'es',
    title: 'Ingeniero de Software Full-Stack · IA aplicada',
    city: 'Madrid',
    h: {
      profile: 'Perfil profesional',
      experience: 'Experiencia',
      projects: 'Otros proyectos',
      education: 'Formación',
      skills: 'Habilidades técnicas',
      languages: 'Idiomas',
      extra: 'Disponibilidad e intereses',
    },
    profile:
      'Ingeniero de software full-stack en el último curso del Grado en Ingeniería de Software (especialidad en Ingeniería de Datos) y cofundador de dos productos SaaS con IA en fase piloto con clientes. Diseño y desarrollo sistemas completos —backend en Rust y TypeScript, interfaces en React, Next.js y Astro, PostgreSQL y despliegue en la nube— con foco en seguridad, privacidad de los datos e IA aplicada. Formación complementaria en 42 Madrid.',
    experience: [
      {
        org: 'Zeonida',
        role: 'Cofundador e Ingeniero de Software',
        meta: 'LegalTech · IA',
        link: 'zeonida.com',
        when: 'Oct. 2026 – Actualidad',
        bullets: [
          'Versión 1.0.0 (octubre de 2026), en piloto con los primeros despachos, de un asistente de IA sin estado para procuradores y abogados: backend en <b>Rust</b> (Axum, Tokio, sqlx, PostgreSQL + pgvector) y web en <b>React 19 + TypeScript</b>.',
          'Seudonimización garantizada por el sistema de tipos (la IA solo recibe texto seudonimizado), núcleo en <b>WebAssembly</b> para un modo privado en el navegador, NER con XLM-RoBERTa en <b>ONNX Runtime</b> y OCR.',
          'Cómputo de plazos procesales (LEC, LOPJ) con festivos por partido judicial; despliegue continuo en Docker y Cloudflare con Sentry. MVP previo en FastAPI + Next.js con 2FA y AES-256-GCM.',
        ],
      },
      {
        org: 'Inmovira',
        role: 'Cofundador e Ingeniero Full-Stack',
        meta: 'SaaS inmobiliario · IA',
        link: 'inmovira.com',
        when: 'Jul. 2026 – Actualidad',
        bullets: [
          'En piloto con agencias. Motor de rastreo que monitoriza varios portales inmobiliarios cada hora con proxies por país y un pipeline de IA en dos niveles que verifica a los anunciantes particulares.',
          'CRM multi-tenant con aislamiento por agencia, alertas en tiempo real por WhatsApp (Gemini) e historial de precios por vivienda.',
          'API en <b>Express 5 + TypeScript</b> (Zod, JWT con rotación de refresh tokens, CSP), web en <b>Astro + Tailwind</b> y despliegue propio en VPS Linux.',
        ],
      },
    ],
    projects: [
      { name: 'Skyline Logistics', meta: 'Java', text: 'simulación logística por capas con patrones Singleton, DAO y Strategy.' },
      { name: 'MovieApp', meta: 'Kotlin · Android', text: 'app MVVM con la API REST de TMDB y persistencia en Firebase.' },
      { name: 'Campus 42', meta: 'C', text: 'libft, push_swap y ft_printf: algoritmos y estructuras de datos sin librerías.' },
    ],
    education: [
      { org: 'U-tad (Centro Universitario de Tecnología y Arte Digital)', what: 'Grado en Ingeniería de Software · Especialidad en Ingeniería de Datos · Último curso', where: 'Las Rozas, Madrid', when: '2021 – 2027', text: 'Pipelines de datos, IA, visión por computador, sistemas de recomendación e IoT.' },
      { org: '42 Madrid (Fundación Telefónica)', what: 'Formación intensiva en programación · metodología peer-to-peer', where: 'Madrid', when: '2023 – 2025', text: '' },
    ],
    skills: [
      ['Lenguajes', 'Rust · TypeScript · Python · JavaScript · Java · Kotlin · C · SQL · R · Bash'],
      ['Frontend', 'React · Next.js · Astro · TanStack · Tailwind CSS · HTML5 · GSAP'],
      ['Backend', 'Axum · FastAPI · Node.js · Express · REST / OpenAPI · JWT · WebSockets'],
      ['Datos / IA', 'PostgreSQL · pgvector · ONNX Runtime · LLMs · Pandas · NumPy · TensorFlow · Spark'],
      ['BBDD', 'PostgreSQL · MongoDB · MySQL / MariaDB · Turso (libSQL) · Firebase · Oracle'],
      ['DevOps', 'Docker · GitHub Actions · Cloudflare · Linux / VPS · Sentry · Vercel · Git'],
    ],
    languages: [['Español', 'Nativo'], ['Inglés', 'B2 – Intermedio alto']],
    extra: [
      ['Disponibilidad', 'Incorporación inmediata.'],
      ['Intereses', 'IA aplicada, LLMs y transformers, privacidad de datos, automatización.'],
      ['Soft skills', 'Autonomía, visión de producto, trabajo en equipo y aprendizaje continuo.'],
    ],
  },
  en: {
    lang: 'en',
    title: 'Full-Stack Software Engineer · Applied AI',
    city: 'Madrid, Spain',
    h: {
      profile: 'Profile',
      experience: 'Experience',
      projects: 'Other projects',
      education: 'Education',
      skills: 'Technical skills',
      languages: 'Languages',
      extra: 'Availability & interests',
    },
    profile:
      'Full-stack software engineer in the final year of a BSc in Software Engineering (Data Engineering track) and co-founder of two AI-powered SaaS products piloting with early customers. I design and build complete systems —Rust and TypeScript backends, React, Next.js and Astro front-ends, PostgreSQL and cloud deployment— with a focus on security, data privacy and applied AI. Additional training at 42 Madrid.',
    experience: [
      {
        org: 'Zeonida',
        role: 'Co-founder & Software Engineer',
        meta: 'LegalTech · AI',
        link: 'zeonida.com',
        when: 'Oct 2026 – Present',
        bullets: [
          'Version 1.0.0 (October 2026), piloting with the first law firms, of a stateless AI assistant for Spanish court representatives and lawyers: <b>Rust</b> backend (Axum, Tokio, sqlx, PostgreSQL + pgvector) and <b>React 19 + TypeScript</b> web app.',
          'Pseudonymisation enforced by the type system (the AI only receives pseudonymised text), <b>WebAssembly</b> core for an in-browser private mode, NER with XLM-RoBERTa on <b>ONNX Runtime</b> and OCR.',
          'Procedural deadline engine with each judicial district’s holidays; continuous deployment on Docker and Cloudflare with Sentry. Earlier MVP in FastAPI + Next.js with 2FA and AES-256-GCM.',
        ],
      },
      {
        org: 'Inmovira',
        role: 'Co-founder & Full-Stack Engineer',
        meta: 'Real estate SaaS · AI',
        link: 'inmovira.com',
        when: 'Jul 2026 – Present',
        bullets: [
          'Piloting with agencies. Crawler that monitors several real estate portals every hour through per-country proxies, plus a two-stage AI pipeline that verifies private sellers.',
          'Multi-tenant CRM with per-agency isolation, real-time WhatsApp alerts (Gemini) and price history per property.',
          '<b>Express 5 + TypeScript</b> API (Zod, rotating JWT refresh tokens, CSP), <b>Astro + Tailwind</b> website and self-managed Linux VPS deployment.',
        ],
      },
    ],
    projects: [
      { name: 'Skyline Logistics', meta: 'Java', text: 'layered logistics simulation with the Singleton, DAO and Strategy patterns.' },
      { name: 'MovieApp', meta: 'Kotlin · Android', text: 'MVVM app with the TMDB REST API and Firebase persistence.' },
      { name: '42 Madrid', meta: 'C', text: 'libft, push_swap and ft_printf: algorithms and data structures from scratch.' },
    ],
    education: [
      { org: 'U-tad (University Centre of Technology and Digital Art)', what: 'BSc in Software Engineering · Data Engineering track · Final year', where: 'Madrid', when: '2021 – 2027', text: 'Data pipelines, AI, computer vision, recommender systems and IoT.' },
      { org: '42 Madrid (Telefónica Foundation)', what: 'Intensive programming training · peer-to-peer methodology', where: 'Madrid', when: '2023 – 2025', text: '' },
    ],
    skills: [
      ['Languages', 'Rust · TypeScript · Python · JavaScript · Java · Kotlin · C · SQL · R · Bash'],
      ['Frontend', 'React · Next.js · Astro · TanStack · Tailwind CSS · HTML5 · GSAP'],
      ['Backend', 'Axum · FastAPI · Node.js · Express · REST / OpenAPI · JWT · WebSockets'],
      ['Data / AI', 'PostgreSQL · pgvector · ONNX Runtime · LLMs · Pandas · NumPy · TensorFlow · Spark'],
      ['Databases', 'PostgreSQL · MongoDB · MySQL / MariaDB · Turso (libSQL) · Firebase · Oracle'],
      ['DevOps', 'Docker · GitHub Actions · Cloudflare · Linux / VPS · Sentry · Vercel · Git'],
    ],
    languages: [['Spanish', 'Native'], ['English', 'B2 – Upper intermediate']],
    extra: [
      ['Availability', 'Immediate start.'],
      ['Interests', 'Applied AI, LLMs and transformers, data privacy, automation.'],
      ['Soft skills', 'Autonomy, product mindset, teamwork and continuous learning.'],
    ],
  },
};
