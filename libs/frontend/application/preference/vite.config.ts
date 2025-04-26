import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig, Plugin } from 'vite'
import dts from 'vite-plugin-dts'
import swc from '@vitejs/plugin-react-swc'

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
  cacheDir:
    '../../../../node_modules/.vite/libs/frontend/application/preference',
  plugins: [
    react(),
    // Used for keeping `use server` or `use client`
    preserveDirectives(),
    rawFilePlugin(),
    swc({
      // Ensure decorators are handled correctly for NestJS
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false, // Set to true if you ever use TSX
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
      // Optional: Specify target environment if needed
      // target: 'es2021',
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
      exclude: ['vite.config.ts'],
      // This will generate a package.json, not configurable https://github.com/nrwl/nx/discussions/23294
      // nxViteTsPaths(),
      // Vite itself doesn't generate declaration files, required for proper type checking
      // insertTypesEntry: true,
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
      },
      name: '@codelab/frontend-application-preference',
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
