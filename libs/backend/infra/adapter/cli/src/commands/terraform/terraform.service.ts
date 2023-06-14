import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { Injectable } from '@nestjs/common'
import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'
import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'
import { Stage } from '../../shared/utils/stage'

@Injectable()
export class TerraformService implements CommandModule<unknown, unknown> {
  command = 'terraform'

  describe = 'Terraform commands'

  builder(yargv: Argv<unknown>) {
    return (
      yargv
        .options({
          ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
        })
        .middleware([loadStageMiddleware])
        .command(
          'init',
          'terraform init',
          (argv) => argv,
          ({ stage }) => {
            execCommand(`cd terraform/environments/${stage} && ./symlink.sh`)
            execCommand(`cd terraform/modules && ./symlink.sh`)

            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} init --upgrade;`,
            )
          },
        )
        .command(
          'plan',
          'terraform plan',
          (argv) => argv,
          ({ stage }) => {
            console.log(process.cwd())

            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} plan`,
            )
          },
        )
        /**
         * Import does not use Terraform cloud environment variables
         *
         * https://github.com/hashicorp/terraform/issues/23407
         */
        .command(
          'import',
          'terraform import',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`,
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
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} apply ${autoApprove}`,
            )
          },
        )
        .command(
          'validate',
          'terraform validate',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} validate`,
            )
          },
        )
        .command(
          'destroy',
          'terraform destroy',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} destroy`,
            )
          },
        )
        .demandCommand(1, 'Please provide a task')
    )
  }

  handler(args: ArgumentsCamelCase) {
    // console.log(args)
  }
}
