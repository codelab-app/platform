import { startsWithCapital } from '@codelab/shared/utils'
import { existsSync, readdirSync } from 'fs'
import path from 'path'
import { ts } from 'typescript-to-proptypes'

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory(),
  )

const getComponentFile = (dir: string, name: string) =>
  readdirSync(dir, { withFileTypes: true }).find(
    (p) => p.isFile() && p.name === `${name}.d.ts`,
  )

/**
 * @param baseDir Download the source code of the library and provide the base dir as an argument, e.g. ~/Downloads/material-ui
 */
export const createTsProgram = (baseDir: string) => {
  if (!existsSync(baseDir)) {
    throw new Error(`Base dir ${baseDir} does not exist`)
  }

  const componentsDir = `${baseDir}/packages/mui-material/src`

  if (!existsSync(componentsDir)) {
    throw new Error(
      `Can't find MUI components dir ${componentsDir}. Verify you've cloned the mui repo in the baseDir, or if the structure hasn't changed`,
    )
  }

  const componentFiles = getDirectories(componentsDir)
    .filter((d) => startsWithCapital(d.name))
    .map((d) => {
      const compFile = getComponentFile(
        path.join(componentsDir, d.name),
        d.name,
      )

      return compFile ? path.join(componentsDir, d.name, compFile.name) : null
    })
    .filter((c): c is string => !!c)

  // Values taken from mui's tsconfig.json
  const program = ts.createProgram(componentFiles, {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES5,
    lib: ['es2020', 'dom'],
    jsx: ts.JsxEmit.Preserve,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    forceConsistentCasingInFileNames: true,
    strict: true,
    noEmit: true,
    experimentalDecorators: true,
    baseUrl: baseDir,
    allowSyntheticDefaultImports: true,
    noErrorTruncation: false,
    allowJs: true,
    paths: {
      '@mui/material': [`${baseDir}/packages/mui-material/src`],
      '@mui/material/*': [`${baseDir}/packages/mui-material/src/*`],
      '@mui/lab': [`${baseDir}/packages/mui-lab/src`],
      '@mui/lab/*': [`${baseDir}/packages/mui-lab/src/*`],
      '@mui/markdown': [`${baseDir}/docs/packages/markdown`],
      '@mui/styled-engine': [`${baseDir}/packages/mui-styled-engine/src`],
      '@mui/styled-engine/*': [`${baseDir}/packages/mui-styled-engine/src/*`],
      '@mui/styled-engine-sc': [`${baseDir}/packages/mui-styled-engine-sc/src`],
      '@mui/styled-engine-sc/*': [
        `${baseDir}/packages/mui-styled-engine-sc/src/*`,
      ],
      '@mui/styles': [`${baseDir}/packages/mui-styles/src`],
      '@mui/styles/*': [`${baseDir}/packages/mui-styles/src/*`],
      '@mui/system': [`${baseDir}/packages/mui-system/src`],
      '@mui/private-theming': [`${baseDir}/packages/mui-private-theming/src`],
      '@mui/private-theming/*': [
        `${baseDir}/packages/mui-private-theming/src/*`,
      ],
      '@mui/types': [`${baseDir}/packages/mui-types`],
      '@mui/core': [`${baseDir}/packages/mui-core/src`],
      '@mui/core/*': [`${baseDir}/packages/mui-core/src/*`],
      '@mui/docs': [`${baseDir}/packages/mui-docs/src`],
      '@mui/docs/*': [`${baseDir}/packages/mui-docs/src/*`],
      '@mui/material-next': [`${baseDir}/packages/mui-material-next/src`],
      '@mui/material-next/*': [`${baseDir}/packages/mui-material-next/src/*`],
      'test/*': [`${baseDir}/test/*`],
      'typescript-to-proptypes': [
        `${baseDir}/packages/typescript-to-proptypes/src`,
      ],
    },
  })

  return {
    componentFiles,
    program,
  }
}
