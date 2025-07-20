import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getAutoApproveOptions, getStageOptions } from '../../shared/options'

/**
 * Terraform CLI service for managing infrastructure
 *
 * Note: As of the symlink refactoring (issue #3773), modules no longer use
 * symlinks for variable sharing. All modules now accept explicit inputs
 * and use the shared-config module pattern.
 */

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
          ...getAutoApproveOptions(),
        })
        .middleware([loadStageMiddleware])
        .command<StageParam>(
          'init',
          'terraform init',
          (argv) => argv,
          ({ stage }) => {
            // Use `tfswitch` to change to specific versions
            // Symlinks are no longer needed - modules now use explicit variable passing
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} init`,
            )
          },
        )
        .command<StageParam>(
          'upgrade',
          'terraform init --upgrade',
          (argv) => argv,
          ({ stage }) => {
            // Upgrade providers to latest versions
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} init --upgrade`,
            )
          },
        )
        .command<StageParam>(
          'plan',
          'terraform plan',
          (argv) => argv,
          ({ stage }) => {
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} plan`,
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
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`,
            )
          },
        )
        .command<StageParam & { autoApprove: boolean }>(
          'apply',
          'terraform apply',
          (argv) => argv,
          ({ autoApprove, stage }) => {
            const autoApproveFlag = autoApprove ? '-auto-approve' : ''

            // Add export TF_LOG=DEBUG for verbose
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} apply ${autoApproveFlag}`,
            )
          },
        )
        .command<StageParam>(
          'validate',
          'terraform validate',
          (argv) => argv,
          ({ stage }) => {
            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} validate`,
            )
          },
        )
        .command<StageParam>(
          'destroy',
          'terraform destroy',
          (argv) => argv,
          ({ stage }) => {
            // `terraform state rm`

            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} destroy`,
            )
          },
        )
        .command<StageParam>(
          'lint',
          'terraform lint',
          (argv) => argv,
          ({ stage }) => {
            execCommand(
              `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --recursive`,
            )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/ci`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/dev`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/prod`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/test`,
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
