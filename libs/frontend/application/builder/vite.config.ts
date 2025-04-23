/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/builder',
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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
        dnd: 'src/dnd/index.ts',
        hooks: 'src/hooks/index.ts',
        sections: 'src/sections/index.ts',
        services: 'src/services/index.ts',
        'use-cases/base-builder': 'src/use-cases/base-builder/index.ts',
        'use-cases/component-builder':
          'src/use-cases/component-builder/index.ts',
        'use-cases/page-builder': 'src/use-cases/page-builder/index.ts',
        'use-cases/page-preview': 'src/use-cases/page-preview/index.ts',
        'use-cases/resize': 'src/use-cases/resize/index.ts',
        utils: 'src/utils/index.ts',
      },
      name: '@codelab/frontend-application-builder',
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
