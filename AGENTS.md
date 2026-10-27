# Portfolio — instrucciones para agentes

- Repositorio **público** (`Luiiss44/portfolio`). Nunca subir teléfono, `raw/`, `cv/private.json`, los PDF completos de `cv/` ni `envio/candidaturas.csv` (todo está en `.gitignore`).
- `raw/` es inmutable.
- El texto de la web está en `src/data/content.ts`; el del CV en `cv/cv-data.mjs`. Mantener ambos coherentes y en castellano e inglés.
- Tras cambiar el CV: `pnpm cv` y comprobar que cada PDF cabe en una página (el script avisa).
- Validar con `pnpm build` y revisar en el navegador (`portfolio` en `.claude/launch.json` del Brain).
- Publicar = push a `main`; GitHub Actions despliega en Pages. No enviar correos ni mensajes en nombre de Luis sin su confirmación.
- Registrar cambios en `log.md`.
