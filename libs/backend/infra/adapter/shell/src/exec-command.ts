import execa from 'execa'

export const execCommand = (command: string) => {
  console.log(`Executing: ${command}`)

  try {
    // Only use shell on CI
    const shell = process.env['CI'] ? true : false

    execa.commandSync(command, {
      shell: true,
      stdio: 'inherit',
    })
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
