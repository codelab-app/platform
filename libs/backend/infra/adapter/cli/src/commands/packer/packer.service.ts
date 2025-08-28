import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { $ } from 'zx'
import { existsSync } from 'fs'
import { join } from 'path'

enum PackerImage {
  Services = 'services',
  ServicesBase = 'services-base',
}

interface PackerBaseOptions {
  consulEncryptKey: string
}

interface PackerBuildOptions extends PackerBaseOptions {
  digitaloceanApiToken: string
  images: Array<PackerImage>
}

interface PackerValidateOptions extends PackerBaseOptions {
  digitaloceanApiToken: string
  images: Array<PackerImage>
}

interface ImageConfig {
  dir: string
  name: string
  template: string
}

@Injectable()
export class PackerService implements CommandModule<unknown, unknown> {
  command = 'packer'

  describe = 'Packer commands for building machine images'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .command<PackerBuildOptions>(
        'build [images..]',
        'Build Packer images',
        (argv) =>
          argv
            .middleware(this.fetchDigitalOceanToken)
            .middleware(this.fetchConsulEncryptKey)
            .positional('images', {
              describe: 'Images to build (defaults to all)',
              type: 'string',
              array: true,
              choices: Object.values(PackerImage),
              default: Object.values(PackerImage),
            }),
        ({ consulEncryptKey, digitaloceanApiToken, images }) => {
          const buildOptions = {
            consulEncryptKey,
            digitaloceanApiToken,
          }

          // Build images in the order they appear in imageConfigs
          for (const item of this.imageConfigs) {
            if (images.includes(item.image)) {
              this.buildImage(item.config, buildOptions)
            }
          }
        },
      )
      .command<PackerValidateOptions>(
        'validate [images..]',
        'Validate Packer templates',
        (argv) =>
          argv
            .middleware(this.fetchDigitalOceanToken)
            .middleware(this.fetchConsulEncryptKey)
            .positional('images', {
              describe: 'Images to validate (defaults to all)',
              type: 'string',
              array: true,
              choices: Object.values(PackerImage),
              default: Object.values(PackerImage),
            }),
        ({ consulEncryptKey, digitaloceanApiToken, images }) => {
          const validateImage = (config: ImageConfig) => {
            const imageDir = join(this.packerDir, config.dir)
            execCommand(`cd ${imageDir} && packer init .`)

            // Pass CONSUL_ENCRYPT_KEY to all images (ignored if not used by some)
            const consulKeyVar = `-var "consul_encrypt_key=${consulEncryptKey}"`

            execCommand(
              `cd ${imageDir} && packer validate -var "digitalocean_api_token=${digitaloceanApiToken}" ${consulKeyVar} ${config.template}`,
            )
          }

          // Validate images in the order they appear in imageConfigs
          for (const item of this.imageConfigs) {
            if (images.includes(item.image)) {
              validateImage(item.config)
            }
          }
        },
      )
      .command(
        'list-images',
        'List Packer-built images in DigitalOcean',
        (argv) => argv,
        () => {
          execCommand(
            'doctl compute image list --public=false | grep "codelab-.*-base"',
          )
        },
      )
      .command(
        'init',
        'Initialize Packer configuration',
        (argv) => argv,
        () => {
          // Initialize all Packer directories
          for (const item of this.imageConfigs) {
            const imageDir = join(this.packerDir, item.config.dir)

            if (existsSync(imageDir)) {
              execCommand(`cd ${imageDir} && packer init .`)
            }
          }
        },
      )
      .command(
        'fmt',
        'Format Packer configuration files',
        (argv) =>
          argv.options({
            check: {
              describe: 'Check if files are formatted (exit 1 if not)',
              type: 'boolean',
              default: false,
            },
          }),
        ({ check }) => {
          const checkFlag = check ? '-check' : ''
          execCommand(`packer fmt ${checkFlag} ${this.packerDir}`)
        },
      )
      .command(
        'get-latest-snapshot',
        'Get the latest snapshot ID',
        (argv) =>
          argv.middleware(this.fetchDigitalOceanToken).option('service', {
            describe: 'Service name (default: services-base)',
            type: 'string',
            default: 'services-base',
          }),
        ({ digitaloceanApiToken, service }) => {
          const pattern = `codelab-${service}`
          $.shell = '/bin/bash'
          const result = $.sync`doctl compute snapshot list --format ID,Name,CreatedAt --no-header --access-token "${digitaloceanApiToken}" | grep "${pattern}" | sort -k3 -r | head -1 | awk '{print $1}'`

          if (!result.stdout.trim()) {
            console.error(`Error: No snapshot found for service: ${service}`)
            process.exit(1)
          }

          // Output JSON format for Packer's external data source
          console.log(JSON.stringify({ id: result.stdout.trim() }))
        },
      )
      .command(
        'cleanup',
        'Clean up old Packer snapshots (keeps only latest)',
        (argv) => argv.middleware(this.fetchDigitalOceanToken),
        ({ digitaloceanApiToken }) => {
          const services = [
            'codelab-services-base',
            'codelab-consul-server',
            'codelab-api-base',
            'codelab-web-base',
            'codelab-landing-base',
            'codelab-sites-base',
            'codelab-neo4j-base',
          ]
          const keepCount = 1

          for (const service of services) {
            console.log(`\nProcessing: ${service}`)

            // Get all snapshots for this service, sorted by name (includes timestamp)
            $.shell = '/bin/bash'
            const result = $.sync`doctl compute snapshot list --format ID,Name --no-header --access-token "${digitaloceanApiToken}" | grep "^[0-9]*[[:space:]]*${service}-[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]" | sort -k2 -r || true`

            if (!result.stdout) {
              console.log(`  No snapshots found for ${service}`)
              continue
            }

            const snapshots = result.stdout.split('\n').filter(Boolean)
            let count = 0

            for (const line of snapshots) {
              count++
              const [snapshotId, snapshotName] = line.split(/\s+/)

              if (count <= keepCount) {
                console.log(
                  `  Keeping latest: ${snapshotName} (ID: ${snapshotId})`,
                )
              } else {
                console.log(
                  `  Deleting old: ${snapshotName} (ID: ${snapshotId})`,
                )
                execCommand(
                  `doctl compute snapshot delete "${snapshotId}" --force --access-token "${digitaloceanApiToken}" || true`,
                )
              }
            }
          }

          console.log('\nCleanup completed!')
          console.log('\nCurrent snapshots:')
          execCommand(
            `doctl compute snapshot list --format Name,Size,CreatedAt --access-token "${digitaloceanApiToken}" | grep -E "(codelab-|Name)" || true`,
          )
        },
      )
      .demandCommand(1, 'Please provide a command')
  }

  handler(_args: ArgumentsCamelCase) {
    // Handler implementation if needed
  }

  /**
   * Build a single image
   */
  private buildImage(
    imageConfig: ImageConfig,
    options: {
      consulEncryptKey: string
      digitaloceanApiToken: string
    },
  ): void {
    const { consulEncryptKey, digitaloceanApiToken } = options

    console.log(`Building ${imageConfig.name}...`)

    // Clean up old snapshots before building to avoid hitting DigitalOcean limits
    $.shell = '/bin/bash'
    const cleanupResult = $.sync`doctl compute snapshot list --format ID,Name --no-header --access-token "${digitaloceanApiToken}" | grep "^[0-9]*[[:space:]]*${imageConfig.name}-base-[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]" | sort -k2 -r | tail -n +2 || true`

    if (cleanupResult.stdout) {
      const oldSnapshots = cleanupResult.stdout.split('\n').filter(Boolean)
      for (const snapshot of oldSnapshots) {
        const [id] = snapshot.split(/\s+/)
        console.log(`Deleting old snapshot: ${id}`)
        execCommand(
          `doctl compute snapshot delete "${id}" --force --access-token "${digitaloceanApiToken}" || true`,
        )
      }
    }

    const imageDir = join(this.packerDir, imageConfig.dir)

    // Set up cleanup handler for Ctrl+C
    const cleanup = () => {
      // Delete all packer build droplets (best effort)
      execCommand(
        'doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk \'{print $1}\' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true',
      )
      process.exit(1)
    }

    // Register signal handlers
    process.on('SIGINT', cleanup) // Ctrl+C
    process.on('SIGTERM', cleanup) // Kill signal

    try {
      // Initialize Packer
      execCommand(`cd ${imageDir} && packer init .`)

      // Build the image (Packer will fetch the latest snapshot automatically via external data source)
      // Pass CONSUL_ENCRYPT_KEY to all images (ignored if not used by some)
      const consulKeyVar = `-var "consul_encrypt_key=${consulEncryptKey}"`

      execCommand(
        `cd ${imageDir} && packer build -var "digitalocean_api_token=${digitaloceanApiToken}" ${consulKeyVar} ${imageConfig.template}`,
      )
    } finally {
      // Remove signal handlers after completion
      process.removeListener('SIGINT', cleanup)
      process.removeListener('SIGTERM', cleanup)
    }
  }

  // Reusable middleware functions
  private fetchConsulEncryptKey = (args: ArgumentsCamelCase) => {
    console.log('Fetching CONSUL_ENCRYPT_KEY from prod-packer workspace...')
    $.shell = '/bin/bash'
    const result = $.sync`cd infra/terraform/environments/prod-packer && terraform output -raw consul_encrypt_key`
    args['consulEncryptKey'] = result.stdout.trim()
    console.log('✓ CONSUL_ENCRYPT_KEY fetched successfully')
  }

  private fetchDigitalOceanToken = (args: ArgumentsCamelCase) => {
    const digitaloceanApiToken = get('DIGITALOCEAN_API_TOKEN')
      .required()
      .asString()
    args['digitaloceanApiToken'] = digitaloceanApiToken
  }
  // Build order: services-base must be built first, then services (which includes all service images)
  private readonly imageConfigs: Array<{
    image: PackerImage
    config: ImageConfig
  }> = [
    {
      image: PackerImage.ServicesBase,
      config: {
        name: 'services-base',
        dir: 'modules/services-base',
        template: 'services-base.pkr.hcl',
      },
    },
    {
      image: PackerImage.Services,
      config: {
        name: 'services',
        dir: 'modules/services',
        template: 'services.pkr.hcl',
      },
    },
  ]
  private readonly packerDir = 'infra/packer'
}
