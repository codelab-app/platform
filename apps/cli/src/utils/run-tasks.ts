/* eslint-disable no-case-declarations */
import execa from 'execa'
import { readFileSync, writeFileSync } from 'fs'
import { TaskEnv } from './env'
import { formatCypher } from './format-cypher'
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
        execCommand('npx nx affected:build --projects=web,cli -c=ci --verbose')
      }

      break

    case Tasks.Format:
      // Format cypher files
      // Get all `*.cypher` files as input

      const files = args?.split(',')

      files?.forEach((file) => {
        const content = readFileSync(file, 'utf8')

        writeFileSync(file, formatCypher(content))
      })

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
        execCommand(
          `${NX_TEST} affected:test --testPathPattern="i.spec.ts" --parallel=1 --memoryLimit=8192 --runInBand`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `npx nx affected:test --testPathPattern="i.spec.ts" --parallel=1 --runInBand --verbose`,
        )
      }

      break

    /**
     * When building next web, we must use env to create the production port, otherwise the ports will be different
     *
     * `configuration` not passed when using affected, use `c`
     */
    case Tasks.E2e:
      if (env === TaskEnv.Test) {
        execCommand(`${NX_TEST} build web -c=test`)
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
