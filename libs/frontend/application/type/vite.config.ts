import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/type',
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
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
        'use-cases/create-field': 'src/use-cases/create-field/index.ts',
        'use-cases/create-type': 'src/use-cases/create-type/index.ts',
        'use-cases/delete-field': 'src/use-cases/delete-field/index.ts',
        'use-cases/delete-type': 'src/use-cases/delete-type/index.ts',
        'use-cases/get-fields': 'src/use-cases/get-fields/index.ts',
        'use-cases/get-types': 'src/use-cases/get-types/index.ts',
        'use-cases/hooks': 'src/use-cases/hooks/index.ts',
        'use-cases/select-types': 'src/use-cases/select-types/index.ts',
        'use-cases/type-table': 'src/use-cases/type-table/index.ts',
        'use-cases/update-field': 'src/use-cases/update-field/index.ts',
        'use-cases/update-type': 'src/use-cases/update-type/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-type',
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
