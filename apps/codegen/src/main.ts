import { config } from 'dotenv'
import { get } from 'env-var'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { isPortOpen } from './utils/server'

config()

const start = async () => {
  const apiEndpoint = get('CODELAB_API_ENDPOINT').required().asUrlString()
  const apiPort = parseInt(new URL(apiEndpoint).port)
  const isOpen = await isPortOpen(apiPort)

  process.env['DOTENV_CONFIG_PATH'] = '.env'

  if (isOpen) {
    shell.exec('yarn env-cmd node dist/apps/api/main.js', {
      async: true,
      cwd: process.cwd(),
    })
  }

  await waitOn({ resources: [apiEndpoint], timeout: 10000 })
    .then(() => {
      const codegenProcess = shell.exec(
        'yarn graphql-codegen --require dotenv/config --config .graphqlconfig.yaml',
        { cwd: process.cwd() },
      )

      if (codegenProcess.code !== 0) {
        shell.exit(1)
      }

      shell.exit(0)
    })
    .catch((err) => {
      console.error('error', err)
    })
}

start()
