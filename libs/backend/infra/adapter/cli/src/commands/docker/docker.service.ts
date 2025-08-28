import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'

interface DockerBuildParams extends StageParam {
  dockerTagVersion: string
  push?: boolean
  service?: string
}

@Injectable()
export class DockerService implements CommandModule<unknown, unknown> {
  command = 'docker'

  describe = 'Docker commands'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .options({
        ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
      })
      .middleware([loadStageMiddleware, this.fetchDockerTagVersion])
      .command<DockerBuildParams>(
        'build [service]',
        'Build Docker images using Docker Bake',
        (argv) =>
          argv
            .positional('service', {
              describe:
                'Service to build (api, landing, web, sites). Omit to build all',
              type: 'string',
              choices: ['api', 'landing', 'web', 'sites'],
            })
            .option('push', {
              describe: 'Push images to registry after building',
              type: 'boolean',
              default: false,
            })
            .option('dockerTagVersion', {
              alias: 'tag',
              describe: 'Docker tag version',
              type: 'string',
            }),
        ({ dockerTagVersion, push, service }) => {
          const pushFlag = push ? ' --push' : ''
          const target = service ? ` ${service}` : ''
          const command = `DOCKER_TAG_VERSION=${dockerTagVersion} docker buildx bake --file .docker/docker-bake.hcl${pushFlag}${target}`
          execCommand(command)
        },
      )
      .command<DockerBuildParams>(
        'push [service]',
        'Push Docker images to registry',
        (argv) =>
          argv
            .positional('service', {
              describe:
                'Service to push (api, landing, web, sites). Omit to push all',
              type: 'string',
              choices: ['api', 'landing', 'web', 'sites'],
            })
            .option('dockerTagVersion', {
              alias: 'tag',
              describe: 'Docker tag version',
              type: 'string',
            }),
        ({ dockerTagVersion, service }) => {
          const target = service ? ` ${service}` : ''
          const command = `DOCKER_TAG_VERSION=${dockerTagVersion} docker buildx bake --file .docker/docker-bake.hcl --push${target}`
          execCommand(command)
        },
      )
      .demandCommand(1, 'Please provide a task')
  }

  handler() {
    //
  }

  // Middleware to fetch Docker tag version
  private fetchDockerTagVersion = (args: ArgumentsCamelCase) => {
    const dockerTagVersion =
      args['dockerTagVersion'] ||
      get('DOCKER_TAG_VERSION').default('latest').asString()
    args['dockerTagVersion'] = dockerTagVersion
  }
}
