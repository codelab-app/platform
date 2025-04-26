import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig, Plugin } from 'vite'
import dts from 'vite-plugin-dts'

const rawFilePlugin = (): Plugin => {
  return {
    name: 'vite-plugin-raw-files',
    transform(code, id) {
      if (/\.(cypher|cyp)$/.test(id)) {
        const fileContent = readFileSync(id, 'utf-8')

        return {
          code: `export default ${JSON.stringify(fileContent)};`,
          map: null, // Provide source map if needed
        }
      }
    },
  }
}

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/frontend/application/app',
  plugins: [
    react(),
    // Used for keeping `use server` or `use client`
    preserveDirectives(),
    rawFilePlugin(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
      exclude: ['vite.config.ts'],
      // This will generate a package.json, not configurable https://github.com/nrwl/nx/discussions/23294
      // nxViteTsPaths(),
      // Vite itself doesn't generate declaration files, required for proper type checking
      insertTypesEntry: true,
      // Very time intensive
      // rollupTypes: true,
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
    // },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        services: 'src/services/index.ts',
        'use-cases/app-item': 'src/use-cases/app-item/index.ts',
        'use-cases/app-list': 'src/use-cases/app-list/index.ts',
        'use-cases/app-production': 'src/use-cases/app-production/index.ts',
        'use-cases/build-app': 'src/use-cases/build-app/index.ts',
        'use-cases/create-app': 'src/use-cases/create-app/index.ts',
        'use-cases/delete-app': 'src/use-cases/delete-app/index.ts',
        'use-cases/export-app': 'src/use-cases/export-app/index.ts',
        'use-cases/import-app': 'src/use-cases/import-app/index.ts',
        'use-cases/select-app-options':
          'src/use-cases/select-app-options/index.ts',
        'use-cases/update-app': 'src/use-cases/update-app/index.ts',
        views: 'src/views/index.ts',
      },
      name: '@codelab/frontend-application-app',
      fileName: (format, entryName) => {
        return entryName === 'index' ? 'index.js' : `${entryName}/index.js`
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: (id) => {
        // Treat bare module specifiers as external.
        // Also, treat absolute paths that don't start with the project root as external.
        return !id.startsWith('.') && !id.startsWith('/')
      },
      output: {
        preserveModules: true,
      },
    },
  },
}))
