import { CommandModule } from 'yargs'
import { getStageOptions } from '../../shared/command'
import { Stage } from '../../shared/utils/stage'
import { execCommand } from '../tasks/tasks.command'

export const terraformCommand: CommandModule<unknown, unknown> = {
  command: 'terraform',
  describe: 'Terraform commands',
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
  handler: () => {
    //
  },
}
