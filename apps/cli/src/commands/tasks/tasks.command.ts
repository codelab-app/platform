import { CommandModule } from 'yargs'
import { Env } from '../../shared/utils/env'
import { runTasks } from '../../shared/utils/run-tasks'
import { Tasks } from '../../shared/utils/tasks'

export const tasksCommand: CommandModule<unknown, unknown> = {
  command: 'tasks',
  describe: 'Run tasks',
  builder: (yargv) =>
    yargv
      .options({
        env: {
          type: 'string',
          choices: Object.values(Env),
          describe: 'Used to load proper `.env`',
          demandOption: true,
        },
      })
      .command(
        Tasks.Unit,
        'Run unit tests',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.Int,
        'Run integration tests',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.Codegen,
        'Run codegen',
        (argv) => argv.fail((msg, err) => console.log(msg, err)),
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.E2e,
        'Run e2e tests',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.Lint,
        'Lint projects',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .command(
        Tasks.Format,
        'Format files',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
      )
      .command(
        Tasks.Commitlint,
        'Commitlint projects',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
      )
      .command(
        Tasks.Build,
        'Build projects',
        (argv) => argv,
        (argv) => runTasks(argv.env, `${argv._[1]}`),
      )
      .demandCommand(1, 'Please provide a task'),
  handler: () => {
    console.log('Tasks handler')
    //
  },
}
