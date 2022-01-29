import execa from 'execa'
import { TaskEnv } from './env'
import { Tasks } from './tasks'

const NX_TEST = 'npx env-cmd -f .env.test nx'

export const runTasks = (env: TaskEnv, task: string, args?: string) => {
  // console.log(env, task)

  switch (task) {
    case Tasks.Build:
      if (env === TaskEnv.Test) {
        execa.command(`${NX_TEST} affected:build --configuration=test`, {
          stdio: 'inherit',
        })
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          'npx nx run-many --target=build --projects=api,web,cmd,cli,tools-rtk-query --configuration-ci --verbose',
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.Lint:
      if (env === TaskEnv.Test) {
        execa.command(`yarn cross-env TIMING=1 lint-staged --verbose`, {
          stdio: 'inherit',
        })
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          `npx nx affected:lint --configuration=ci --quiet && npx prettier --check '**/*,{graphql.yaml.json}'`,
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.Unit:
      if (env === TaskEnv.Test) {
        execa.command(
          `${NX_TEST} affected:test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color`,
          {
            stdio: 'inherit',
          },
        )
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          `npx nx affected:test --testPathPattern="[^i].spec.ts" --verbose --color`,
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.Int:
      if (env === TaskEnv.Test) {
        execa.command(
          `${NX_TEST} affected:test --testPathPattern="i.spec.ts" --parallel=1 --memoryLimit=8192 --runInBand`,
          {
            stdio: 'inherit',
          },
        )
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          `npx nx affected:test --testPathPattern="i.spec.ts" --parallel=1 --runInBand --verbose`,
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.E2e:
      if (env === TaskEnv.Test) {
        execa.command(
          `${NX_TEST} affected:e2e --configuration=test --browser firefox`,
          {
            stdio: 'inherit',
          },
        )
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          `yarn affected:e2e --configuration ci --record --browser firefox`,
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.Commitlint:
      if (env === TaskEnv.Test) {
        execa.command(`npx --no-install commitlint --edit ${args}`, {
          stdio: 'inherit',
        })
      }

      if (env === TaskEnv.Ci) {
        execa.command(
          `yarn affected:e2e --configuration ci --record --browser firefox`,
          {
            stdio: 'inherit',
          },
        )
      }

      break
    case Tasks.Circularlint:
      execa.command(
        `yarn madge --circular apps libs --extensions ts,tsx,js,jsx`,
        {
          stdio: 'inherit',
        },
      )

      break
    default:
      throw new Error('Incorrect test env')
  }
}
