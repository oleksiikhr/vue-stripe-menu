import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  base: 'production' === process.env.NODE_ENV ? '/vue-stripe-menu/' : '',
};

export default config;
