// Genera los PDF del CV con Chromium (Playwright):
//   cv/CV_Luis_Marquina_Rodriguez[_EN].pdf         → versión completa (con teléfono) para enviar
//   public/cv/CV_Luis_Marquina_Rodriguez[_EN].pdf  → versión pública de la web (sin teléfono)
// Uso: pnpm cv
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cv, contact } from './cv-data.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const fontFile = join(root, 'node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2');
const font = `data:font/woff2;base64,${readFileSync(fontFile).toString('base64')}`;
const photo = `data:image/jpeg;base64,${readFileSync(join(here, 'foto-cv.jpg')).toString('base64')}`;

const sep = '<span class="sep">|</span>';
const a = (href, text) => `<a href="${href}">${text}</a>`;

function html(d, withPhone) {
  const links = [
    a(`mailto:${contact.email}`, contact.email),
    withPhone ? contact.phone : null,
    d.city,
  ].filter(Boolean).join(sep);
  const links2 = [
    a(`https://${contact.web}`, contact.web),
    a(`https://${contact.linkedin}`, contact.linkedin),
    a(`https://${contact.github}`, contact.github),
  ].join(sep);

  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8"><title>CV ${contact.name}</title>
<style>
@font-face { font-family: 'Inter Tight'; src: url('${font}') format('woff2'); font-weight: 100 900; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: 'Inter Tight', Arial, sans-serif; color: #1b1d23; font-size: 9.1pt; line-height: 1.34; }
.page { width: 210mm; min-height: 297mm; padding: 11mm 14mm 8mm; position: relative; }
.page::before { content: ''; position: absolute; left: 0; top: 0; right: 0; height: 3.2mm; background: linear-gradient(90deg, #4b3fd1, #8a6cff 55%, #ff7a45); }
a { color: inherit; text-decoration: none; }
header { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: center; padding-bottom: 3.4mm; border-bottom: 0.6pt solid #d9dbe3; }
h1 { margin: 0; font-size: 24pt; letter-spacing: -0.035em; line-height: 1; font-weight: 700; color: #12131a; }
.role { margin: 2mm 0 2.6mm; font-size: 11.5pt; font-weight: 600; color: #4b3fd1; letter-spacing: -0.01em; }
.contact { font-size: 8.7pt; color: #3d4150; line-height: 1.6; }
.contact a { color: #3d4150; }
.sep { color: #b4b8c6; margin: 0 2mm; }
.photo { width: 25mm; height: 28mm; border-radius: 3mm; object-fit: cover; }
section { margin-top: 3.3mm; }
h2 { margin: 0 0 2mm; font-size: 8.4pt; letter-spacing: 0.16em; text-transform: uppercase; color: #4b3fd1; font-weight: 700; display: flex; align-items: center; gap: 3mm; }
h2::after { content: ''; flex: 1; height: 0.6pt; background: #e2e4ec; }
p { margin: 0; }
.profile { color: #2c2f3a; }
.job { margin-bottom: 2.2mm; }
.job:last-child { margin-bottom: 0; }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
.job-org { font-size: 11pt; font-weight: 700; color: #12131a; letter-spacing: -0.01em; }
.job-role { font-weight: 600; color: #12131a; }
.job-when { font-size: 8.6pt; color: #5b6070; white-space: nowrap; font-weight: 500; }
.job-meta { font-size: 8.6pt; color: #6b7080; margin: 0.4mm 0 1.2mm; }
.job-meta a { color: #4b3fd1; font-weight: 600; }
ul { margin: 0; padding: 0; list-style: none; }
li { position: relative; padding-left: 3.6mm; margin-bottom: 0.6mm; color: #2c2f3a; }
li::before { content: ''; position: absolute; left: 0.4mm; top: 0.62em; width: 1.3mm; height: 1.3mm; border-radius: 50%; background: #8a6cff; }
li b { color: #12131a; font-weight: 650; }
.projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.2mm; }
.proj { border: 0.6pt solid #e2e4ec; border-radius: 2mm; padding: 2.2mm 2.6mm; }
.proj-name { font-weight: 700; color: #12131a; }
.proj-meta { font-size: 8.4pt; color: #6b7080; }
.proj p { font-size: 8.5pt; color: #3d4150; line-height: 1.32; }
.edu { display: grid; grid-template-columns: 1fr auto; gap: 0 4mm; margin-bottom: 1.6mm; }
.edu:last-child { margin-bottom: 0; }
.edu-org { font-weight: 700; color: #12131a; }
.edu-what { color: #4b3fd1; font-weight: 600; font-size: 9pt; }
.edu-right { text-align: right; font-size: 8.6pt; color: #5b6070; }
.edu-text { grid-column: 1 / -1; font-size: 8.8pt; color: #3d4150; margin-top: 0.4mm; }
.skills { display: grid; grid-template-columns: 22mm 1fr; gap: 0.5mm 3mm; }
.skills dt { font-weight: 700; color: #12131a; font-size: 9pt; }
.skills dd { margin: 0; color: #2c2f3a; font-size: 9pt; }
.cols { display: grid; grid-template-columns: 1fr 1.9fr; gap: 6mm; }
.kv { display: grid; grid-template-columns: auto 1fr; gap: 0.4mm 3mm; font-size: 8.9pt; }
.kv b { color: #12131a; font-weight: 700; }
</style></head><body><div class="page">
<header>
  <div>
    <h1>${contact.name}</h1>
    <p class="role">${d.title}</p>
    <div class="contact">${links}<br>${links2}</div>
  </div>
  <img class="photo" src="${photo}" alt="">
</header>

<section><h2>${d.h.profile}</h2><p class="profile">${d.profile}</p></section>

<section><h2>${d.h.experience}</h2>
${d.experience.map((j) => `<div class="job">
  <div class="job-head"><div><span class="job-org">${j.org}</span> <span class="sep">·</span> <span class="job-role">${j.role}</span></div><span class="job-when">${j.when}</span></div>
  <p class="job-meta">${j.meta} <span class="sep">·</span> ${a(`https://${j.link}`, j.link)}</p>
  <ul>${j.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
</div>`).join('')}
</section>

<section><h2>${d.h.projects}</h2><ul>
${d.projects.map((p) => `<li><b>${p.name}</b> <span class="proj-meta">(${p.meta})</span> — ${p.text}</li>`).join('')}
</ul></section>

<section><h2>${d.h.education}</h2>
${d.education.map((e) => `<div class="edu"><div><div class="edu-org">${e.org}</div><div class="edu-what">${e.what}</div></div><div class="edu-right">${e.where}<br>${e.when}</div>${e.text ? `<p class="edu-text">${e.text}</p>` : ''}</div>`).join('')}
</section>

<section><h2>${d.h.skills}</h2><dl class="skills" style="margin:0">
${d.skills.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
</dl></section>

<section class="cols">
  <div><h2>${d.h.languages}</h2><div class="kv">${d.languages.map(([k, v]) => `<b>${k}</b><span>${v}</span>`).join('')}</div></div>
  <div><h2>${d.h.extra}</h2><div class="kv">${d.extra.map(([k, v]) => `<b>${k}</b><span>${v}</span>`).join('')}</div></div>
</section>
</div></body></html>`;
}

const outputs = [
  { lang: 'es', phone: true, file: join(here, 'CV_Luis_Marquina_Rodriguez.pdf') },
  { lang: 'en', phone: true, file: join(here, 'CV_Luis_Marquina_Rodriguez_EN.pdf') },
  { lang: 'es', phone: false, file: join(root, 'public/cv/CV_Luis_Marquina_Rodriguez.pdf') },
  { lang: 'en', phone: false, file: join(root, 'public/cv/CV_Luis_Marquina_Rodriguez_EN.pdf') },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const o of outputs) {
  const doc = html(cv[o.lang], o.phone);
  if (o.phone) writeFileSync(o.file.replace(/\.pdf$/, '.html'), doc);
  await page.setContent(doc, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const height = await page.evaluate(() => document.querySelector('.page').scrollHeight);
  mkdirSync(dirname(o.file), { recursive: true });
  await page.pdf({ path: o.file, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const mm = (height / 96) * 25.4;
  console.log(`${o.file}  alto=${mm.toFixed(1)}mm ${mm > 297.5 ? '⚠ más de una página' : 'ok'}`);
}
await browser.close();
