import { spawn } from 'child_process'
import { makeAsyncGenerator } from './generator'
import { graphqlQueryPaths } from './generator-settings'

/**
 * We're generating frontend graphql queries into gql wrapped functions to be used with apollo client
 */
export const main = () => {
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
  generator.on('close', (msg) => {
    makeAsyncGenerator({ sourceGqlPaths: graphqlQueryPaths }).then(() => {
      // Close server
      codelabApiServer.kill()
      generator.kill()
    })
  })
}

main()
