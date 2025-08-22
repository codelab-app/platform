import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { existsSync } from 'fs'
import { join } from 'path'

enum PackerImage {
  ConsulServer = 'consul-server',
  Services = 'services',
  ServicesBase = 'services-base',
}

interface PackerBuildOptions {
  debug?: boolean
  force?: boolean
  images: Array<PackerImage>
  stage?: string
  varFile?: string
}

interface PackerValidateOptions {
  images: Array<PackerImage>
  stage?: string
  varFile?: string
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
            .positional('images', {
              describe: 'Images to build (defaults to all)',
              type: 'string',
              array: true,
              choices: Object.values(PackerImage),
              default: Object.values(PackerImage),
            })
            .options({
              force: {
                alias: 'f',
                describe: 'Force rebuild even if image exists',
                type: 'boolean',
                default: false,
              },
              'var-file': {
                describe: 'Path to a variables file',
                type: 'string',
              },
              debug: {
                alias: 'd',
                describe: 'Enable debug output',
                type: 'boolean',
                default: false,
              },
            }),
        ({ debug, force, images, stage, varFile }) => {
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          const buildOptions = {
            debug,
            digitalOceanToken,
            force,
            stage,
            varFile,
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
            .positional('images', {
              describe: 'Images to validate (defaults to all)',
              type: 'string',
              array: true,
              choices: Object.values(PackerImage),
              default: Object.values(PackerImage),
            })
            .options({
              'var-file': {
                describe: 'Path to a variables file',
                type: 'string',
              },
            }),
        ({ images, stage, varFile }) => {
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          const varFileFlag = varFile ? `-var-file="${varFile}"` : ''

          const validateImage = (config: ImageConfig) => {
            const imageDir = join(this.packerDir, config.dir)
            execCommand(`cd ${imageDir} && packer init .`)
            execCommand(
              `cd ${imageDir} && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" ${config.template}`,
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
      debug?: boolean
      digitalOceanToken: string
      force?: boolean
      stage?: string
      varFile?: string
    },
  ): void {
    const { debug, digitalOceanToken, force, varFile } = options

    const forceFlag = force ? '-force' : ''
    const varFileFlag = varFile ? `-var-file="${varFile}"` : ''
    const debugFlag = debug ? 'PACKER_LOG=1' : ''

    console.log(`Building ${imageConfig.name}...`)

    // Clean up old snapshots before building to avoid hitting DigitalOcean limits
    try {
      // Use the external cleanup script
      execCommand(
        `DO_API_TOKEN="${digitalOceanToken}" ${this.packerDir}/scripts/cleanup-old-snapshots.sh`,
      )
    } catch (error) {
      // Continue with build even if cleanup fails
    }

    const imageDir = join(this.packerDir, imageConfig.dir)

    // Set up cleanup handler for Ctrl+C
    const cleanup = () => {
      try {
        // Delete all packer build droplets
        execCommand(
          'doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk \'{print $1}\' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true',
        )
      } catch (error) {
        // Cleanup failed
      }
      process.exit(1)
    }

    // Register signal handlers
    process.on('SIGINT', cleanup) // Ctrl+C
    process.on('SIGTERM', cleanup) // Kill signal

    try {
      // Initialize Packer
      execCommand(`cd ${imageDir} && packer init .`)

      // Build the image (Packer will fetch the latest snapshot automatically via external data source)
      execCommand(
        `cd ${imageDir} && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" ${imageConfig.template}`,
      )
    } finally {
      // Remove signal handlers after completion
      process.removeListener('SIGINT', cleanup)
      process.removeListener('SIGTERM', cleanup)
    }
  }
  // Order matters: services-base must be built first, then consul-server and services
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
      image: PackerImage.ConsulServer,
      config: {
        name: 'consul-server',
        dir: 'modules/consul-server',
        template: 'consul-server.pkr.hcl',
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
