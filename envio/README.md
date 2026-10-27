# Envío rápido del CV

Tres formas, de más rápida a más personal.

## 1. Enlace corto (pegar en cualquier sitio)

- CV en castellano: **https://luis.inmovira.com/cv**
- CV en inglés: https://luis.inmovira.com/cv/CV_Luis_Marquina_Rodriguez_EN.pdf
- Portfolio: https://luis.inmovira.com

La versión pública no lleva teléfono. La completa (con teléfono) está en `cv/` y es la que se adjunta por correo.

## 2. Correo de candidatura en 10 segundos

```powershell
.\envio\enviar-cv.ps1 -Empresa "Cabify" -Email "talento@cabify.com" -Puesto "Backend Engineer"
.\envio\enviar-cv.ps1 -Empresa "Datadog" -Email "jobs@datadoghq.com" -Puesto "Software Engineer" -Idioma en
```

Abre un borrador de Gmail ya redactado y el Explorador con el PDF seleccionado para arrastrarlo. No envía nada solo: revisas y pulsas «Enviar». Cada candidatura queda en `envio/candidaturas.csv` (fuera de Git) para el seguimiento.

## 3. Mensajes para LinkedIn

**A un reclutador (castellano, ≤ 300 caracteres para la invitación):**

> Hola, {nombre}. Soy ingeniero de software full-stack (Rust, TypeScript, IA) y he lanzado dos SaaS con IA en producción este año. Me interesan las posiciones de {equipo} en {empresa}. ¿Te puedo enviar mi CV? luis.inmovira.com

**A un reclutador (inglés):**

> Hi {name}, I'm a full-stack software engineer (Rust, TypeScript, AI) who shipped two AI-powered SaaS products this year. I'd love to hear about {team} roles at {company}. Portfolio: luis.inmovira.com

**Seguimiento a los 7 días:**

> Hola, {nombre}. Te escribo de nuevo por mi candidatura a {puesto}. Sigo muy interesado; si os encaja, os cuento en 15 minutos cómo construí Zeonida e Inmovira. Gracias.

## Consejos

- En LinkedIn activa «Open to work» solo para reclutadores (Configuración → Preferencias de empleo) para no mostrarlo en público.
- En portales con «Solicitud sencilla» (LinkedIn, InfoJobs, Indeed) sube el PDF de `cv/` como CV predeterminado: cada candidatura es un clic.
- Regenera los PDF tras cambiar `cv/cv-data.mjs`: `pnpm cv`.
