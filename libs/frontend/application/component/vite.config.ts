/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir:
    '../../../../node_modules/.vite/libs/frontend/application/component',
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
        'use-cases/component-builder':
          'src/use-cases/component-builder/index.ts',
        'use-cases/component-list': 'src/use-cases/component-list/index.ts',
        'use-cases/create-component': 'src/use-cases/create-component/index.ts',
        'use-cases/delete-component': 'src/use-cases/delete-component/index.ts',
        'use-cases/export-component': 'src/use-cases/export-component/index.ts',
        'use-cases/get-component': 'src/use-cases/get-component/index.ts',
        'use-cases/import-component': 'src/use-cases/import-component/index.ts',
        'use-cases/update-component': 'src/use-cases/update-component/index.ts',
        'use-cases/update-component-props':
          'src/use-cases/update-component-props/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-component',
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
