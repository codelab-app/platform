import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { Stage } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'
import { loadStageMiddleware } from '../../shared/middleware'
import type { StageParam } from '../../shared/options'
import { getStageOptions } from '../../shared/options'

@Injectable()
export class TerraformService implements CommandModule<unknown, unknown> {
  command = 'terraform'

  describe = 'Terraform commands'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return (
      yargv
        .options({
          ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
        })
        .middleware([loadStageMiddleware])
        .command<StageParam>(
          'init',
          'terraform init',
          (argv) => argv,
          ({ stage }) => {
            // Use `tfswitch` to change to specific versions
            execCommand(`cd terraform/environments/${stage} && ./symlink.sh`)
            execCommand('cd terraform/modules && ./symlink.sh')

            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} init --upgrade;`,
            )
          },
        )
        .command<StageParam>(
          'plan',
          'terraform plan',
          (argv) => argv,
          ({ stage }) => {
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
        .command<StageParam>(
          'import',
          'terraform import',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`,
            )
          },
        )
        .command<StageParam>(
          'apply',
          'terraform apply',
          (argv) => argv,
          ({ stage }) => {
            const autoApprove = stage === Stage.Prod ? '-auto-approve' : ''

            // Add export TF_LOG=DEBUG for verbose
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} apply ${autoApprove}`,
            )
          },
        )
        .command<StageParam>(
          'validate',
          'terraform validate',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} validate`,
            )
          },
        )
        .command<StageParam>(
          'destroy',
          'terraform destroy',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=terraform/environments/${stage} destroy`,
            )
          },
        )
        .command<StageParam>(
          'lint',
          'terraform lint',
          (argv) => argv,
          ({ stage }) => {
            return execCommand(
              `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --recursive`,
            )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=terraform/environments/ci`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=terraform/environments/dev`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=terraform/environments/prod`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=terraform/environments/test`,
            // )
          },
        )
        .demandCommand(1, 'Please provide a task')
    )
  }

  handler(args: ArgumentsCamelCase) {
    //
  }
}
