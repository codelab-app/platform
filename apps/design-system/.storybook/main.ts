import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { mergeConfig } from 'vite'

const require = createRequire(import.meta.url);

const storybookConfig: StorybookConfig = {
  addons: [
    getAbsolutePath("@nx/react/plugins/storybook"),
  ],
  framework: {
    /**
     * Decorator issue with `@storybook/nextjs`
     */
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../../../libs/frontend/cui/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [nxViteTsPaths()],
    }),
}

export default storybookConfig

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
