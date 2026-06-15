import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  use: {
    baseURL: 'https://labquiz-vsp4.vercel.app',
  },
});