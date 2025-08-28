import type { ProcessOutput } from 'zx'

import { $ as zx$ } from 'zx'

// Configure zx to show commands being executed
zx$.verbose = true // This will show commands BEFORE execution and show output

// To log commands without verbose output (which includes stderr in red):
// Option 1: Override $.log to only show commands
// zx$.verbose = false
// zx$.log = (entry) => {
//   if (entry.kind === 'cmd') {
//     console.log(`$ ${entry.cmd}`)
//   }
// }

// Option 2: Use verbose but redirect stderr to avoid red output
// This is what we're using - verbose shows commands and output normally

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
 *   $stream.sync`terraform apply -auto-approve`
 *   $stream.syncWithEnv({ FOO: 'bar' })`npm run build`
 */
export const $stream = Object.assign(
  // Main function for async execution with streaming
  (pieces: TemplateStringsArray, ...args: Array<unknown>) => {
    return zx$({ stdio: 'inherit' })(pieces, ...args)
  },
  {
    // Sync method for synchronous execution with streaming
    sync: (
      pieces: TemplateStringsArray,
      ...args: Array<unknown>
    ): ProcessOutput => {
      return zx$.sync({ stdio: 'inherit' })(pieces, ...args)
    },
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

/**
 * $quiet - For commands where you don't want to log the command execution
 *
 * Use cases:
 * - Health checks in loops
 * - Frequent status checks that would spam the console
 * - Commands run in parallel where logging would be confusing
 * - Getting values where the command itself is not important
 *
 * Example:
 *   const ip = $quiet.sync`hostname -I | awk '{print $1}'`
 *   const isRunning = $quiet.sync`pgrep node`.exitCode === 0
 */
export const $quiet = Object.assign(
  // Main function for async execution without verbose output
  (pieces: TemplateStringsArray, ...args: Array<unknown>) => {
    return zx$({ verbose: false })(pieces, ...args)
  },
  {
    // Sync method for synchronous execution without verbose output
    sync: (
      pieces: TemplateStringsArray,
      ...args: Array<unknown>
    ): ProcessOutput => {
      return zx$.sync({ verbose: false })(pieces, ...args)
    },
    // Sync with env option - returns a function that accepts template literal
    syncWithEnv: (env: Record<string, string>) => {
      return (
        pieces: TemplateStringsArray,
        ...args: Array<unknown>
      ): ProcessOutput => {
        return zx$.sync({ verbose: false, env })(pieces, ...args)
      }
    },
  },
)
