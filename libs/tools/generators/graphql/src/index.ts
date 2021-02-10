import { spawn } from 'child_process'
import * as shell from 'shelljs'

const projectRoot = 'apps/api/codelab'

const startServerCmd = `npx env-cmd -f .env cross-env PORT=4001 \
npx ts-node --project ${projectRoot}/tsconfig.app.json -r tsconfig-paths/register ${projectRoot}/src/main.ts`

const waitForCmd = 'npx wait-on http://localhost:4001 && exit 0'

const graphqlCodegenCmd =
  'npx --unhandled-rejections=strict graphql-codegen --config .graphqlconfig.yaml'
/**
 * We're generating frontend graphql queries into gql wrapped functions to be used with apollo client
 */

export const main = () => {
  const codelabApiServer = spawn(startServerCmd, {
    stdio: 'inherit',
    shell: true,
  })

  codelabApiServer.on('message', (msg) => {
    console.log(msg)
  })

  const waitFor = spawn(waitForCmd, {
    stdio: 'inherit',
    shell: true,
  })

  // Server has started
  waitFor.on('close', (msg) => {
    /**
     * We use yml config instead, since we're combining scripts
     */
    shell.exec(graphqlCodegenCmd)
    codelabApiServer.kill()
    // makeAsyncGenerator({ sourceGqlPaths: graphqlQueryPaths }).then(() => {
    //   // Close server
    //   codelabApiServer.kill()
    //   generator.kill()
    // })
  })
}

main()
