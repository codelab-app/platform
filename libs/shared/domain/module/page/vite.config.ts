import type { Plugin } from 'vite'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react-swc'
import { readFileSync } from 'fs'
import { join } from 'path'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import topLevelAwait from 'vite-plugin-top-level-await'

const rawFilePlugin = (): Plugin => {
  return {
    name: 'vite-plugin-raw-files',
    transform: (code, id) => {
      if (/\.(cypher|cyp)$/.test(id)) {
        const fileContent = readFileSync(id, 'utf-8')

        return {
          code: `export default ${JSON.stringify(fileContent)};`,
          // Provide source map if needed
          map: null,
        }
      }
    },
  }
}

/**
 * Vite doesn't read from tsconfig.json to keep it fast since it doesn't need to read file system.
 */
export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../../../node_modules/.vite/libs/shared/domain/module/page',
  plugins: [
    /**
     * The generated code contains 'async/await' because this module is using "topLevelAwait".
     * However, your target environment does not appear to support 'async/await'.
     * As a result, the code may not run as expected or may cause runtime errors
     *
     * Tried to use esm & change target but still showing error
     */
    // topLevelAwait(),
    react({
      devTarget: 'es2022',
      /** ➊ Let the plugin turn on decorator *parsing* for TS files */
      tsDecorators: true,

      /** ➋ Patch SWC so it *transforms* them with the legacy rules */
      useAtYourOwnRisk_mutateSwcOptions: (options) => {
        options.jsc ??= {}

        // swc plugin may not pick up tsconfig.lib.json
        options.jsc.target = 'es2022'

        // legacy = the same semantics Babel/TS have used for years
        options.jsc.transform ??= {}
        options.jsc.transform.legacyDecorator = true
        options.jsc.transform.decoratorMetadata = true
      },
    }),
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
      // insertTypesEntry: true,
      // Very time intensive
      // rollupTypes: true,
    }),
  ],
  // covers rare css/json transforms
  esbuild: { target: 'es2022' },
  // <── dev-server pre-bundle
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
      supported: { 'top-level-await': true },
    },
  },
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
        index: 'src/index.ts',
      },
      name: '@codelab/shared-domain-module-page',
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
    // Add support for top-level await
    target: 'es2022',
  },
}))
