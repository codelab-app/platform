import type { CommandModule } from 'yargs'
import { getStageOptions } from '../../shared/command'
import { Stage } from '../../shared/utils/stage'
import { execCommand } from '../tasks/tasks.command'

export const terraformCommand: CommandModule<unknown, unknown> = {
  builder: (yargv) =>
    yargv
      .options({
        ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
      })
      .command(
        'init',
        'terraform init',
        (argv) => argv,
        ({ stage }) => {
          execCommand(`cd terraform/environments/${stage} && ./symlink.sh`)
          execCommand(`cd terraform/modules && ./symlink.sh`)

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
          const autoApprove = stage === Stage.Prod ? '-auto-approve' : ''

          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} apply ${autoApprove}`,
          )
        },
      )
      .command(
        'validate',
        'terraform validate',
        (argv) => argv,
        ({ stage }) => {
          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} validate`,
          )
        },
      )
      .command(
        'destroy',
        'terraform destroy',
        (argv) => argv,
        ({ stage }) => {
          return execCommand(
            `cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} destroy`,
          )
        },
      )
      .demandCommand(1, 'Please provide a task'),
  command: 'terraform',
  describe: 'Terraform commands',
  handler: () => {
    //
  },
}
