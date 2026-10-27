import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://luis.inmovira.com',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
});
