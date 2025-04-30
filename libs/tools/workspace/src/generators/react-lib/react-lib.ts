import type { ProjectConfiguration } from '@nx/devkit'

import { processLibrary } from '../../utils/process-library'
import { reactLibGenerator } from './generator'

// Combine the filter logic directly into the HOC call
export const processReactLib = processLibrary(
  (projectConfig: ProjectConfiguration): boolean => {
    return Boolean(projectConfig.sourceRoot?.startsWith('libs/frontend'))
  },
  reactLibGenerator,
)
