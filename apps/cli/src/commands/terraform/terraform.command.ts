import { CommandModule } from 'yargs'
import { getStageOptions } from '../../shared/command'
import { Stage } from '../../shared/utils/env'
import { execCommand } from '../tasks/tasks.command'

const chdirMap = (stage: Stage | unknown) => {
  switch (stage) {
    case Stage.Dev:
      return 'environments/dev'
    case Stage.CI:
      return 'environments/ci'
    case Stage.Prod:
      return 'environments/prod'
    default:
      throw new Error('Incorrect stage')
  }
}

export const terraformCommand: CommandModule<unknown, unknown> = {
  command: 'terraform',
  describe: 'Terraform commands',
  builder: (yargv) =>
    yargv
      .options({ ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod]) })
      .command(
        'init',
        'terraform init',
        (argv) => argv,
        ({ stage }) => {
          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} init;`,
          )
        },
      )
      .command(
        'plan',
        'terraform plan',
        (argv) => argv,
        ({ stage }) => {
          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} plan`,
          )
        },
      )
      .command(
        'apply',
        'terraform apply',
        (argv) => argv,
        ({ stage }) => {
          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} apply`,
          )
        },
      )
      .demandCommand(1, 'Please provide a task'),
  handler: () => {
    //
  },
}
