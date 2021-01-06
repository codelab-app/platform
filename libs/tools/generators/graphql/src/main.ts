import { spawn } from 'child_process'
import { getAsyncGenerators } from './generator'

export const main = async () => {
  const startServerCmd = `npx env-cmd -f .env cross-env PORT=4001 \
    node dist/apps/api/codelab/main.js`

  const codelabApiServer = spawn(startServerCmd, {
    stdio: 'inherit',
    shell: true,
  })

  codelabApiServer.on('message', (msg) => {
    console.log(msg)
  })

  const generateCmd = 'npx wait-on http://localhost:4001 && exit 0'

  const generator = spawn(generateCmd, {
    stdio: 'inherit',
    shell: true,
  })

  // Server has started
  generator.on('close', async (msg) => {
    await Promise.all(getAsyncGenerators())

    // Close server
    codelabApiServer.kill()
    generator.kill()
  })
}

main()
