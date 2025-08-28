import type { Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'
import { $ } from 'zx'

import type { StageParam } from '../../shared/options'
import { loadStageMiddleware } from '../../shared/middleware'
import { getAutoApproveOptions, getStageOptions } from '../../shared/options'

interface TerraformParams extends StageParam {
  tag?: string
}

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
            execCommand(
              `cd infra/terraform/environments/${stage} && ./symlink.sh`,
            )
            execCommand('cd infra/terraform/modules && ./symlink.sh')

            execCommand(
              `export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} init --upgrade;`,
            )
          },
        )
        .command<TerraformParams>(
          'plan',
          'terraform plan',
          (argv) =>
            argv.option('tag', {
              describe: 'Docker tag version',
              type: 'string',
            }),
          ({ stage, tag }) => {
            const dockerTagEnv = tag ? `DOCKER_TAG_VERSION=${tag} ` : ''
            execCommand(
              `export TF_WORKSPACE=${stage}; ${dockerTagEnv}terraform -chdir=infra/terraform/environments/${stage} plan`,
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
        .command<TerraformParams & { autoApprove: boolean }>(
          'apply',
          'terraform apply',
          (argv) =>
            argv.option('tag', {
              describe: 'Docker tag version',
              type: 'string',
            }),
          async ({ autoApprove, stage, tag }) => {
            const autoApproveFlag = autoApprove ? '-auto-approve' : ''
            const tfDir = `infra/terraform/environments/${stage}`
            
            // Set DOCKER_TAG_VERSION if provided
            if (tag) {
              process.env['DOCKER_TAG_VERSION'] = tag
            }

            /**
             * Two-stage Terraform apply to solve the Consul provider bootstrap problem:
             *
             * Problem: The Consul provider needs the Consul server's IP address, but the server
             * doesn't exist until Terraform creates it. Providers are initialized before resources
             * are created, causing a chicken-and-egg problem.
             *
             * Solution: Apply in two stages:
             * 1. Create Consul server first using -target
             * 2. Set CONSUL_HTTP_ADDR environment variable with the server's IP
             * 3. Apply remaining resources (Consul provider now has correct address)
             */

            // Stage 1: Create Consul server infrastructure only
            this.applyConsulInfrastructure(stage, tfDir, autoApproveFlag)

            // Get Consul server IP and configure environment
            const consulIP = await this.getConsulServerIP()
            process.env['CONSUL_HTTP_ADDR'] = `${consulIP}:8500`

            // Stage 2: Apply all remaining infrastructure and Consul configuration
            this.applyRemainingInfrastructure(
              stage,
              tfDir,
              process.env['CONSUL_HTTP_ADDR'],
              autoApproveFlag,
            )

            console.log('✨ Terraform apply completed successfully')
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
          () => {
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

  handler() {
    //
  }

  // Helper methods for two-stage Terraform apply
  private applyConsulInfrastructure(
    stage: string,
    tfDir: string,
    autoApproveFlag: string,
  ) {
    console.log('🔧 Stage 1/2: Creating Consul server infrastructure...')
    const dockerTagEnv = process.env['DOCKER_TAG_VERSION']
      ? `DOCKER_TAG_VERSION=${process.env['DOCKER_TAG_VERSION']} `
      : ''
    execCommand(
      `export TF_WORKSPACE=${stage}; ${dockerTagEnv}terraform -chdir=${tfDir} apply -target=module.consul ${autoApproveFlag}`,
    )
  }

  private applyRemainingInfrastructure(
    stage: string,
    tfDir: string,
    consulAddr: string,
    autoApproveFlag: string,
  ) {
    console.log(
      '🚀 Stage 2/2: Applying remaining infrastructure and configuration...',
    )
    // Set environment variables properly for the subprocess
    process.env['TF_WORKSPACE'] = stage
    process.env['CONSUL_HTTP_ADDR'] = consulAddr

    console.log(`Setting CONSUL_HTTP_ADDR=${consulAddr}`)
    console.log(
      `Current CONSUL_HTTP_ADDR in process.env: ${process.env['CONSUL_HTTP_ADDR']}`,
    )

    // Use env command to ensure the variable is passed
    const dockerTagEnv = process.env['DOCKER_TAG_VERSION']
      ? `DOCKER_TAG_VERSION=${process.env['DOCKER_TAG_VERSION']} `
      : ''
    execCommand(
      `env ${dockerTagEnv}CONSUL_HTTP_ADDR=${consulAddr} TF_WORKSPACE=${stage} terraform -chdir=${tfDir} apply ${autoApproveFlag}`,
    )
  }

  private async getConsulServerIP(): Promise<string> {
    console.log('🔍 Retrieving Consul server IP address...')
    // Use doctl to get the Consul server's public IP by droplet name
    const result = await $`doctl compute droplet get consul-server --format PublicIPv4 --no-header`
    const consulIP = result.stdout.trim()

    if (!consulIP) {
      throw new Error(
        'Failed to retrieve Consul server IP address from DigitalOcean',
      )
    }

    console.log(`✅ Consul server IP: ${consulIP}`)

    return consulIP
  }
}
