/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/presentation/view',
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
        'components/button': 'src/components/button/index.ts',
        'components/conditionalView': 'src/components/conditionalView/index.ts',
        'components/error': 'src/components/error/index.ts',
        'components/key': 'src/components/key/index.ts',
        'components/loader': 'src/components/loader/index.ts',
        'components/overlay': 'src/components/overlay/index.ts',
        'components/progressBar': 'src/components/progressBar/index.ts',
        'components/skeleton': 'src/components/skeleton/index.ts',
        'components/state': 'src/components/state/index.ts',
        'components/table': 'src/components/table/index.ts',
        'components/upload': 'src/components/upload/index.ts',
        'components/wrapIf': 'src/components/wrapIf/index.ts',
        sections: 'src/sections/index.ts',
        style: 'src/style/index.ts',
        templates: 'src/templates/index.ts',
      },
      name: '@codelab/frontend-presentation-view',
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
