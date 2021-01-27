import { spawn } from 'child_process'

/**
 * Lint files
 */
export const lintFiles = (files: Array<string>) => {
  console.log(`${files.join(' ')}`)
  spawn(`npx eslint ${files.join(' ')} --fix`, {
    stdio: 'inherit',
    shell: true,
  })
}
