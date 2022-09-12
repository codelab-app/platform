import { CommandModule } from 'yargs'
import { requireTestEnvOptions } from '../../utils/options'
import { runTasks } from '../../utils/run-tasks'
import { Tasks } from '../../utils/tasks'

export const tasksCommand: CommandModule<unknown, unknown> = {
  command: 'tasks',
  describe: 'Run tasks',
  builder: (yargs) =>
    yargs
      .command(Tasks.Unit, 'Run unit tests', requireTestEnvOptions, (argv) =>
        runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.Int,
        'Run integration tests',
        requireTestEnvOptions,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(Tasks.E2e, 'Run e2e tests', requireTestEnvOptions, (argv) =>
        runTasks(argv.env, `${argv._[1]}`),
      )
      .command(Tasks.Lint, 'Lint projects', requireTestEnvOptions, (argv) =>
        runTasks(argv.env, `${argv._[1]}`),
      )
      .command(Tasks.Format, 'Format files', requireTestEnvOptions, (argv) =>
        runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
      )
      .command(
        Tasks.Commitlint,
        'Commitlint projects',
        requireTestEnvOptions,
        (argv) => runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
      )
      .command(Tasks.Build, 'Build projects', requireTestEnvOptions, (argv) =>
        runTasks(argv.env, `${argv._[1]}`),
      )
      .demandCommand(1, 'Please provide a task'),
  handler: () => {
    //
  },
}
