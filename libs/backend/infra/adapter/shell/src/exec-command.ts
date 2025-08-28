import { $ } from 'zx'

export const execCommand = (command: string) => {
  console.log(`Executing: ${command}`)

  try {
    $.shell = '/bin/bash'
    $.verbose = false // We're already logging the command
    
    const result = $.sync`${command}`
    return result
  } catch (error) {
    console.error(error)
    /**
     * Serve doesn't detect exit code
     *
     *  https://github.com/nrwl/nx/issues/9239
     */
    process.exit(1)
  }
}
