import { spawn } from 'child_process'

/**
 * Lint files
 */
export const lintFiles = (files: Array<string>) => {
  spawn(`npx eslint ${files.join(' ')} --fix`, {
    stdio: 'inherit',
    shell: true,
  })
}
