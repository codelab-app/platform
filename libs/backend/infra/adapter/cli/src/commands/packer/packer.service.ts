import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { commandSync } from 'execa'
import { existsSync } from 'fs'
import { join } from 'path'

enum PackerImage {
  Services = 'services',
  ServicesBase = 'services-base',
}

interface PackerBaseOptions {
  consulEncryptKey?: string
}

interface PackerBuildOptions extends PackerBaseOptions {
  digitalOceanToken?: string
  images: Array<PackerImage>
  stage?: string
}

interface PackerValidateOptions extends PackerBaseOptions {
  digitalOceanToken?: string
  images: Array<PackerImage>
  stage?: string
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
        ({ consulEncryptKey, digitalOceanToken, images, stage }) => {
          const buildOptions = {
            consulEncryptKey,
            digitalOceanToken,
            stage,
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
        ({ consulEncryptKey, digitalOceanToken, images }) => {
          const validateImage = (config: ImageConfig) => {
            const imageDir = join(this.packerDir, config.dir)
            execCommand(`cd ${imageDir} && packer init .`)

            // Pass CONSUL_ENCRYPT_KEY to all images (ignored if not used)
            const consulKeyVar = consulEncryptKey
              ? `-var "consul_encrypt_key=${consulEncryptKey}"`
              : ''

            execCommand(
              `cd ${imageDir} && packer validate -var "do_token=${digitalOceanToken}" ${consulKeyVar} ${config.template}`,
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
      consulEncryptKey?: string
      digitalOceanToken?: string
      stage?: string
    },
  ): void {
    const { consulEncryptKey, digitalOceanToken } = options

    console.log(`Building ${imageConfig.name}...`)

    // Clean up old snapshots before building to avoid hitting DigitalOcean limits
    // Use the external cleanup script (non-critical, so we don't fail if it errors)
    execCommand(
      `DO_API_TOKEN="${digitalOceanToken}" ${this.packerDir}/scripts/cleanup-old-snapshots.sh || true`,
    )

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
      // Pass CONSUL_ENCRYPT_KEY to all images (ignored if not used)
      const consulKeyVar = consulEncryptKey
        ? `-var "consul_encrypt_key=${consulEncryptKey}"`
        : ''

      execCommand(
        `cd ${imageDir} && packer build -var "do_token=${digitalOceanToken}" ${consulKeyVar} ${imageConfig.template}`,
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
    const result = commandSync(
      'cd infra/terraform/environments/prod-packer && terraform output -raw consul_encrypt_key',
      { shell: true },
    )
    args['consulEncryptKey'] = result.stdout.trim()
    console.log('✓ CONSUL_ENCRYPT_KEY fetched successfully')
  }

  private fetchDigitalOceanToken = (args: ArgumentsCamelCase) => {
    const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
      .required()
      .asString()
    args['digitalOceanToken'] = digitalOceanToken
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
