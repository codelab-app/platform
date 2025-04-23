/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/lambda',
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
        'use-cases/create-lambda': 'src/use-cases/create-lambda/index.ts',
        'use-cases/delete-lambda': 'src/use-cases/delete-lambda/index.ts',
        'use-cases/execute-lambda': 'src/use-cases/execute-lambda/index.ts',
        'use-cases/get-lambdas': 'src/use-cases/get-lambdas/index.ts',
        'use-cases/update-lambda': 'src/use-cases/update-lambda/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-lambda',
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
