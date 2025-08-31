import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { $, $stream, globalHandler } from '@codelab/backend-infra-adapter-shell'
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
        globalHandler(({ dockerTagVersion, push, service }) => {
          const pushFlag = push ? '--push' : ''
          const targets = service ? [service] : []
          const env = { ...process.env, DOCKER_TAG_VERSION: dockerTagVersion }
          if (pushFlag) {
            $stream.syncWithEnv(
              env,
            )`docker buildx bake --file .docker/docker-bake.hcl ${pushFlag} ${targets}`
          } else {
            $stream.syncWithEnv(
              env,
            )`docker buildx bake --file .docker/docker-bake.hcl ${targets}`
          }
        }),
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
        globalHandler(({ dockerTagVersion, service }) => {
          const targets = service ? [service] : []
          const env = { ...process.env, DOCKER_TAG_VERSION: dockerTagVersion }
          $stream.syncWithEnv(
            env,
          )`docker buildx bake --file .docker/docker-bake.hcl --push ${targets}`
        }),
      )
      .command(
        'cleanup',
        'Clean up old Docker images from DigitalOcean registry (keeps last 3 versions)',
        (argv) => argv,
        globalHandler(() => {
          const repositories = ['api', 'landing', 'web', 'sites']
          const keepLastN = 3

          for (const repo of repositories) {
            console.log(`\nProcessing repository: ${repo}`)

            // Get all tags sorted by date (newest first), excluding 'latest'
            const result = $.sync`doctl registry repository list-tags ${repo} --format Tag,UpdatedAt --no-header | grep -v "^latest" | sort -k2 -r || true`
            const output = result.stdout.trim()

            if (!output) {
              console.log(`No tags found for ${repo}`)
              continue
            }

            const tagLines = output.split('\n').filter(Boolean)
            if (tagLines.length <= keepLastN) {
              console.log(
                `Repository has ${tagLines.length} tags, keeping all (minimum: ${keepLastN})`,
              )
              continue
            }

            // Tags to delete (skip the first keepLastN)
            const tagsToDelete = tagLines
              .slice(keepLastN)
              .map((line: string) => line.split(/\s+/)[0])
              .filter(Boolean)

            if (tagsToDelete.length > 0) {
              console.log(
                `Deleting ${tagsToDelete.length} old tags from ${repo}...`,
              )
              $stream.sync`doctl registry repository delete-tag ${repo} ${tagsToDelete} --force`
              console.log(`Deleted ${tagsToDelete.length} tags from ${repo}`)
            }
          }

          // Start garbage collection
          console.log('\nStarting garbage collection to reclaim space...')
          $stream.sync`doctl registry garbage-collection start --include-untagged-manifests --force`
          console.log('Garbage collection started')
        }),
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
