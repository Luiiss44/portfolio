# Log — Portfolio

## 2026-10-27 — Creación

- Carpeta `Portfolio/` creada en el Brain como repositorio propio (`Luiiss44/portfolio`).
- Web en Astro 7 con preloader, fondo WebGL propio, scroll suave (Lenis), animaciones GSAP (SplitText, ScrollTrigger), galería horizontal fijada, cursor magnético y versión en inglés (`/en/`). Respeta `prefers-reduced-motion`.
- CV rehecho en HTML → PDF (Chromium) en castellano e inglés, A4, una página. Cambios respecto al original:
  - Añadida la experiencia en Zeonida y reordenado como «Experiencia» (Zeonida, Inmovira) + «Otros proyectos».
  - Titular «Ingeniero de Software Full-Stack · IA aplicada»; el perfil ya no empieza por «Estudiante de…». La formación sigue, con sus fechas.
  - Quitada la línea «prácticas curriculares sujetas a convenio con U-tad» (se puede recuperar en `cv/cv-data.mjs`).
  - Añadidos Rust, Astro, Axum, FastAPI, pgvector, ONNX Runtime, Turso, GitHub Actions, Cloudflare y Sentry.
- Limitación: la versión pública del CV no incluye el teléfono; el repo es público y el teléfono vive en `cv/private.json` (ignorado).
