import glob from 'glob'

export const useCaseInput = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  cwd: process.cwd(),
})

export const antdInput = glob.sync('libs/alpha/ui/antd/src/**/*.input.ts', {
  cwd: process.cwd(),
})

export const cssProps = glob.sync(
  'libs/tools/generators/json-schema/src/types/*.ts',
  {
    cwd: process.cwd(),
  },
)
