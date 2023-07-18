import execa from 'execa'

export const execCommand = (command: string) => {
  console.log(`Executing: ${command}`)

  try {
    // Only use shell on CI
    const shell = process.env['CI'] ? true : false

    execa.commandSync(command, {
      shell,
      stdio: 'inherit',
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
