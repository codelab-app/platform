/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/atom',
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
        'components/ant-design/icon': 'src/components/ant-design/icon/index.ts',
        'components/custom/codelab-script':
          'src/components/custom/codelab-script/index.ts',
        'components/custom/grid-layout':
          'src/components/custom/grid-layout/index.ts',
        'components/custom/text-list':
          'src/components/custom/text-list/index.ts',
        'components/mui/icon': 'src/components/mui/icon/index.ts',
        services: 'src/services/index.ts',
        'use-cases/atom-list': 'src/use-cases/atom-list/index.ts',
        'use-cases/atom-list/server': 'src/use-cases/atom-list/server/index.ts',
        'use-cases/atom-table': 'src/use-cases/atom-table/index.ts',
        'use-cases/create-atom': 'src/use-cases/create-atom/index.ts',
        'use-cases/delete-atom': 'src/use-cases/delete-atom/index.ts',
        'use-cases/helper': 'src/use-cases/helper/index.ts',
        'use-cases/select-atom': 'src/use-cases/select-atom/index.ts',
        'use-cases/update-atom': 'src/use-cases/update-atom/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-atom',
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
