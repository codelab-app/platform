import execa from 'execa'

export const execCommand = (command: string) => {
  console.log(`Executing: ${command}`)

  try {
    execa.commandSync(command, {
      // shell: true,
      stdio: 'inherit',
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
