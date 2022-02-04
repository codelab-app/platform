import execa from 'execa'
import { TaskEnv } from './env'
import { Tasks } from './tasks'

const NX_TEST = 'npx env-cmd -f .env.test nx'

const execCommand = (command: string) => {
  try {
    execa.commandSync(command, {
      stdio: 'inherit',
    })
  } catch (e) {
    process.exit(1)
  }
}

export const runTasks = (env: TaskEnv, task: string, args?: string) => {
  // console.log(env, task)

  switch (task) {
    case Tasks.Build:
      if (env === TaskEnv.Test) {
        execCommand(
          `${NX_TEST} affected:build --configuration=test --exclude=tools-plugins-codelab`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          'npx nx run-many --target=build --projects=api,web,cmd,cli,tools-rtk-query --configuration=ci --verbose',
        )
      }

      break
    case Tasks.Lint:
      if (env === TaskEnv.Test) {
        execCommand(`yarn cross-env TIMING=1 lint-staged --verbose`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `npx nx affected:lint --configuration=ci --quiet && npx prettier --check '**/*,{graphql.yaml.json}'`,
        )
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
    case Tasks.E2e:
      if (env === TaskEnv.Test) {
        execCommand(
          `${NX_TEST} affected:e2e --configuration=test --browser firefox`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `yarn affected:e2e --configuration=ci --record --browser firefox`,
        )
      }

      break
    case Tasks.Commitlint:
      if (env === TaskEnv.Test) {
        execCommand(`npx --no-install commitlint --edit ${args}`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `yarn affected:e2e --configuration=ci --record --browser firefox`,
        )
      }

      break
    case Tasks.Circularlint:
      execCommand(`yarn madge --circular apps libs --extensions ts,tsx,js,jsx`)

      break
    default:
      throw new Error('Incorrect test env')
  }
}
