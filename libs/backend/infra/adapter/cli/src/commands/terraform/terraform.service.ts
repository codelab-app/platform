import type { Argv, CommandModule } from 'yargs'

import { $, $stream, globalHandler } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'

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
          ...getStageOptions([
            Stage.Dev,
            Stage.CI,
            Stage.Prod,
            Stage.ProdKube,
            Stage.ProdRuntime,
            Stage.Test,
          ]),
        })
        .middleware([loadStageMiddleware])
        .command<StageParam>(
          'init',
          'terraform init',
          (argv) => argv,
          globalHandler(({ stage }) => {
            $stream.sync({
              cwd: `infra/terraform/environments/${stage}`,
            })`./symlink.sh`
            $stream.sync({ cwd: 'infra/terraform/modules' })`./symlink.sh`

            const env = { ...process.env, TF_WORKSPACE: stage }
            $stream.syncWithEnv(
              env,
            )`terraform -chdir=infra/terraform/environments/${stage} init --upgrade`
          }),
        )
        .command<TerraformParams>(
          'plan',
          'terraform plan',
          (argv) =>
            argv.option('tag', {
              describe: 'Docker tag version',
              type: 'string',
            }),
          globalHandler(({ stage, tag }) => {
            // Build dashboards for prod-runtime before planning
            this.buildDashboardsIfNeeded(stage)

            const env = {
              ...process.env,
              TF_WORKSPACE: stage,
              ...(tag && { DOCKER_TAG_VERSION: tag }),
            }
            $stream.syncWithEnv(
              env,
            )`terraform -chdir=infra/terraform/environments/${stage} plan`
          }),
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
          globalHandler(({ stage }) => {
            const env = { ...process.env, TF_WORKSPACE: stage }
            $stream.syncWithEnv(
              env,
            )`terraform -chdir=infra/terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`
          }),
        )
        .command<TerraformParams & { autoApprove: boolean }>(
          'apply',
          'terraform apply',
          (argv) =>
            argv
              .option('tag', {
                describe: 'Docker tag version',
                type: 'string',
              })
              .option('autoApprove', {
                describe: 'Automatically approve terraform changes',
                type: 'boolean',
                default: true,
              }),
          globalHandler(({ autoApprove, stage, tag }) => {
            const autoApproveFlag = autoApprove ? '-auto-approve' : ''
            const tfDir = `infra/terraform/environments/${stage}`

            // Build dashboards for prod-runtime before applying
            this.buildDashboardsIfNeeded(stage)

            let consulAddr: string | undefined

            // Only prod stage requires consul two-stage apply
            if (stage === 'prod') {
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
              this.applyConsulInfrastructure(stage, tfDir, autoApproveFlag, tag)

              // Get Consul server IP and configure environment
              const consulIP = this.getConsulServerIP()
              consulAddr = `${consulIP}:8500`
            }

            // Apply terraform with or without consul address
            this.applyTerraform(stage, tfDir, autoApproveFlag, tag, consulAddr)

            console.log('✨ Terraform apply completed successfully')
          }),
        )
        .command<StageParam>(
          'validate',
          'terraform validate',
          (argv) => argv,
          globalHandler(({ stage }) => {
            const env = { ...process.env, TF_WORKSPACE: stage }
            $stream.syncWithEnv(
              env,
            )`terraform -chdir=infra/terraform/environments/${stage} validate`
          }),
        )
        .command<StageParam>(
          'destroy',
          'terraform destroy',
          (argv) => argv,
          globalHandler(({ stage }) => {
            // `terraform state rm`

            const env = { ...process.env, TF_WORKSPACE: stage }
            $stream.syncWithEnv(
              env,
            )`terraform -chdir=infra/terraform/environments/${stage} destroy -auto-approve`
          }),
        )
        .command<StageParam>(
          'lint',
          'terraform lint',
          (argv) => argv,
          globalHandler(() => {
            const cwd = process.cwd()
            $stream.sync`tflint --config="${cwd}/terraform/.tflint.hcl" --recursive`
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/ci`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/dev`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/prod`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/test`,
            // )
          }),
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
    tag?: string,
  ) {
    console.log('🔧 Stage 1/2: Creating Consul server infrastructure...')
    const env = {
      ...process.env,
      TF_WORKSPACE: stage,
      ...(tag && { DOCKER_TAG_VERSION: tag }),
    }
    $stream.syncWithEnv(
      env,
    )`terraform -chdir=${tfDir} apply -refresh=true -target=module.consul ${autoApproveFlag}`
  }

  private applyTerraform(
    stage: string,
    tfDir: string,
    autoApproveFlag: string,
    tag?: string,
    consulAddr?: string,
  ) {
    if (consulAddr) {
      console.log(
        '🚀 Stage 2/2: Applying remaining infrastructure and configuration...',
      )
      console.log(`Setting CONSUL_HTTP_ADDR=${consulAddr}`)
    }

    const env = {
      ...process.env,
      TF_WORKSPACE: stage,
      ...(tag && { DOCKER_TAG_VERSION: tag }),
      ...(consulAddr && { CONSUL_HTTP_ADDR: consulAddr }),
    }
    $stream.syncWithEnv(
      env,
    )`terraform -chdir=${tfDir} apply -refresh=true ${autoApproveFlag}`
  }

  private buildDashboardsIfNeeded(stage: string) {
    // Build dashboards for prod-runtime before terraform operations
    if (stage === 'prod-runtime' || stage === Stage.ProdRuntime) {
      console.log('📊 Building Grafana dashboards...')
      $stream.sync({
        cwd: 'infra/terraform/modules/grafana-dashboards',
      })`make build`
    }
  }

  private getConsulServerIP(): string {
    console.log('🔍 Retrieving Consul server IP address...')
    // Use doctl to get the Consul server's public IP by droplet name
    const result = $.sync`doctl compute droplet get consul-server --format PublicIPv4 --no-header`
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
