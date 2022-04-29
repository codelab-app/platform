/* eslint-disable no-case-declarations */
import concurrently from 'concurrently'
import execa from 'execa'
import { TaskEnv } from './env'
import { Tasks } from './tasks'

const NX_TEST = 'npx env-cmd -f .env.test nx'

export const execCommand = (command: string) => {
  try {
    execa.commandSync(command, {
      stdio: 'inherit',
    })
  } catch (e) {
    process.exit(1)
  }
}

export const runTasks = (env: TaskEnv, task: string, args?: string) => {
  switch (task) {
    case Tasks.Build:
      if (env === TaskEnv.Test) {
        execCommand(
          `${NX_TEST} affected:build -c=test --exclude=tools-plugins-codelab`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand('npx nx affected:build -c=ci --verbose')
      }

      break

    case Tasks.Format:
      // Format cypher files
      // Get all `*.cypher` files as input

      // const files = args?.split(',')
      //
      // files?.forEach((file) => {
      //   const content = readFileSync(file, 'utf8')
      //
      // })

      break

    case Tasks.Lint:
      if (env === TaskEnv.Test) {
        execCommand(`yarn cross-env TIMING=1 lint-staged --verbose`)
        execCommand(`npx ls-lint`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(`npx nx affected:lint`)
        execCommand(`npx prettier --check ./**/*.{graphql,yaml,json}`)
        execCommand(`npx ls-lint`)
      }

      break

    case Tasks.Unit:
      if (env === TaskEnv.Test) {
        execCommand(
          `${NX_TEST} affected:test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `npx nx affected:test --testPathPattern="[^i].spec.ts" --verbose --color`,
        )
      }

      break

    case Tasks.Int:
      if (env === TaskEnv.Test) {
        concurrently(
          [
            'npx env-cmd -f .env.test npx next start dist/apps/web-test --port 3001',
            // 'nx serve web -c test',
            `npx wait-on "http://127.0.0.1:3001" && \
          ${NX_TEST} run-many \
            --target=test \
            --projects=web \
            --testPathPattern="i.spec.ts" \
            --parallel=1 \
            --memoryLimit=8192 \
            --runInBand`,
          ],
          {
            killOthers: 'success',
          },
        ).commands.forEach((command) => {
          /**
           * Kill concurrently commands when parent process exits
           */
          process.on('exit', () => {
            command.kill()
          })
        })
      }

      if (env === TaskEnv.Ci) {
        concurrently(
          [
            'npx next start dist/apps/web --port 3000',
            // 'nx serve web -c ci',
            `npx wait-on "http://127.0.0.1:3001" && \
          ${NX_TEST} run-many \
            --target=test \
            --projects=web \
            --testPathPattern="i.spec.ts" \
            --parallel=1 \
            --memoryLimit=8192 \
            --runInBand`,
          ],
          {
            killOthers: 'success',
          },
        ).commands.forEach((command) => {
          /**
           * Kill concurrently commands when parent process exits
           */
          process.on('exit', () => {
            command.kill()
          })
        })
      }

      break

    /**
     * When building next web, we must use env to create the production port, otherwise the ports will be different
     *
     * `configuration` not passed when using affected, use `c`
     */
    case Tasks.E2e:
      if (env === TaskEnv.Test) {
        execCommand(`${NX_TEST} run web-e2e:e2e:test --verbose`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(`npx nx run web-e2e:e2e:ci --record`)
      }

      break

    case Tasks.Commitlint:
      if (env === TaskEnv.Test) {
        execCommand(`npx --no-install commitlint --edit ${args}`)
      }

      break

    case Tasks.Circularlint:
      execCommand(`yarn madge --circular apps libs --extensions ts,tsx,js,jsx`)

      break

    default:
      throw new Error('Incorrect test env')
  }
}
