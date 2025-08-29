import type { ProcessOutput } from 'zx'

import { $ as zx$ } from 'zx'

// Configure zx to show commands being executed without verbose output
// This logs only the commands, not the output (unless there's an error)
zx$.verbose = false
zx$.log = (entry) => {
  if (entry.kind === 'cmd') {
    console.log(`$ ${entry.cmd}`)
  }
}

// Re-export the configured $
export const $ = zx$

/**
 * $stream - For long-running commands where you want to see output in real-time
 *
 * Use cases:
 * - terraform apply/plan/destroy - see progress as it happens
 * - docker build - see layer progress
 * - npm install - see package download progress
 * - test runners - see test results as they complete
 * - any command that takes > 5 seconds and has progress output
 *
 * Note: Cannot capture output with stdio: 'inherit', so don't use for:
 * - Commands where you need to parse stdout/stderr
 * - Commands where you need the result.stdout value
 *
 * Example:
 *   $stream`terraform apply -auto-approve`
 *   $stream.sync`terraform apply -auto-approve`
 *   $stream.sync({ cwd: 'path/to/dir' })`packer init .`
 *   $stream.syncWithEnv({ FOO: 'bar' })`npm run build`
 */
export const $stream = Object.assign(
  // Main function for async execution with streaming
  (pieces: TemplateStringsArray, ...args: Array<unknown>) => {
    return zx$({ stdio: 'inherit' })(pieces, ...args)
  },
  {
    // Sync method for synchronous execution with streaming
    // Supports both direct template literal and options + template literal
    sync: ((
      piecesOrOptions: TemplateStringsArray | { cwd?: string },
      ...args: Array<unknown>
    ):
      | ((
          pieces: TemplateStringsArray,
          ...templateArgs: Array<unknown>
        ) => ProcessOutput)
      | ProcessOutput => {
      // If first arg is a template literal array, execute directly
      if (Array.isArray(piecesOrOptions) && 'raw' in piecesOrOptions) {
        return zx$.sync({ stdio: 'inherit' })(
          piecesOrOptions as TemplateStringsArray,
          ...args,
        )
      }
      // If first arg is options object, return a function that accepts template literal
      const options = piecesOrOptions as { cwd?: string }
      return (
        pieces: TemplateStringsArray,
        ...templateArgs: Array<unknown>
      ): ProcessOutput => {
        return zx$.sync({ stdio: 'inherit', ...options })(
          pieces,
          ...templateArgs,
        )
      }
    }) as ((
      pieces: TemplateStringsArray,
      ...args: Array<unknown>
    ) => ProcessOutput) &
      ((options: {
        cwd?: string
      }) => (
        pieces: TemplateStringsArray,
        ...args: Array<unknown>
      ) => ProcessOutput),
    // Sync with env option - returns a function that accepts template literal
    syncWithEnv: (env: Record<string, string>) => {
      return (
        pieces: TemplateStringsArray,
        ...args: Array<unknown>
      ): ProcessOutput => {
        return zx$.sync({ stdio: 'inherit', env })(pieces, ...args)
      }
    },
  },
)
