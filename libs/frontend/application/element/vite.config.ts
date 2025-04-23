/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/element',
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    // commonjsOptions: {
    //  transformMixedEsModules: true,
    //},
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        services: 'src/services/index.ts',
        'use-cases/create-element': 'src/use-cases/create-element/index.ts',
        'use-cases/delete-element': 'src/use-cases/delete-element/index.ts',
        'use-cases/hook-description': 'src/use-cases/hook-description/index.ts',
        'use-cases/move-element': 'src/use-cases/move-element/index.ts',
        'use-cases/update-element': 'src/use-cases/update-element/index.ts',
        'use-cases/update-element-props':
          'src/use-cases/update-element-props/index.ts',
        validation: 'src/validation/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-element',
      fileName: (format, entryName) => {
        return entryName === 'index'
          ? `index.${format}.js`
          : `${entryName}/index.${format}.js`
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
}))
