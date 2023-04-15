import type { UserConfig } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueStripeMenu',
      fileName: (format) => `vue-stripe-menu.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'vue-stripe-menu[extname]',
      },
    },
  },
};

export default config;
