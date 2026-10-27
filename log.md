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
- Repo `Luiiss44/portfolio` creado privado y, con el OK expreso de Luis, hecho público el mismo día.
- Publicado en **https://luis.inmovira.com**: GitHub Pages (build por Actions), CNAME `luis → luiiss44.github.io` en Cloudflare (cuenta lmrodriguez2017, zona inmovira.com) en modo «DNS only» para que GitHub emita el certificado; HTTPS forzado.
- LinkedIn (copia del estado anterior en `raw/linkedin-2026-10-27-antes.md`):
  - Titular: «Ingeniero de Software Full-Stack · IA aplicada | Rust · TypeScript · Python | Cofundador de Zeonida (LegalTech) · Fundador de Inmovira (PropTech)». Ojo: LinkedIn sustituye el titular por el último puesto al añadir una experiencia; hubo que reponerlo.
  - «Acerca de» reescrito sin «Soy estudiante…», con Zeonida, Inmovira y enlace al portfolio.
  - Experiencia añadida: Zeonida (oct. 2026–hoy) e Inmovira (jul. 2026–hoy), sin avisar a la red ni publicar en el feed.
  - Aptitudes nuevas: Rust y PostgreSQL (vinculadas a Zeonida). Educación sin cambios.

## 2026-10-27 (tarde) — Ajustes pedidos por Luis

- Luis es **cofundador de ambos** proyectos; en Inmovira además desarrolló la plataforma y la web. Ninguno es todavía empresa constituida: están **en piloto con sus primeros clientes**.
- Web y CV: Inmovira pasa a «Cofundador · Ingeniero full-stack»; se sustituye «en producción» por «en piloto con clientes»; el perfil menciona el último curso del Grado.
- LinkedIn pasado al inglés:
  - Titular: «Software Engineer | Final-year Software Engineering student @ U-tad | Rust · TypeScript · AI | Co-founder @ Zeonida & Inmovira».
  - «Acerca de» en inglés, abierto también a prácticas («roles and internships»).
  - Puestos: «Co-founder & Software Engineer» (Zeonida) y «Co-founder & Full-Stack Engineer» (Inmovira), descripción en inglés, sin tipo de empleo (antes «Autónomo», que sugería alta como autónomo).
  - Sin avisar a la red ni publicar en el feed.
- Luis pide quitar «Final-year» y «@ U-tad». Titular final: «Software Engineer | Software Engineering student | Rust · TypeScript · AI | Co-founder @ Zeonida & Inmovira».
- «Acerca de» reescrito siguiendo buenas prácticas investigadas: gancho con palabras clave en los ~200 primeros caracteres (lo visible antes de «ver más»), primera persona, proyectos con datos, lista de skills y cierre con email, portfolio y GitHub; unas 230 palabras.
