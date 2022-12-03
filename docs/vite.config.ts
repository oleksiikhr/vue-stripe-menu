import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

const config: UserConfig = {
  plugins: [vue()],
  server: {
    host: true,
  },
};

export default config;
