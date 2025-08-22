import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { existsSync } from 'fs'
import { join } from 'path'

interface PackerBuildOptions {
  debug?: boolean
  force?: boolean
  image?: string
  varFile?: string
}

interface PackerValidateOptions {
  image?: string
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
        'build [image]',
        'Build a Packer image',
        (argv) =>
          argv
            .positional('image', {
              describe:
                'Image to build (services-base, consul-server, services, all)',
              type: 'string',
              default: 'services-base',
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
        ({ debug, force, image, varFile }) => {
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          const buildOptions = {
            debug,
            digitalOceanToken,
            force,
            varFile,
          }

          switch (image) {
            case 'all':
              console.log('Building all images...\n')

              // Build services-base first (base image)
              console.log('Step 1: Building services base image...')
              this.buildImage(this.imageConfigs['services-base'], buildOptions)
              console.log('')

              // Build consul server (depends on app)
              console.log('Step 2: Building Consul server image...')
              this.buildImage(this.imageConfigs['consul-server'], buildOptions)
              console.log('')

              // Then build services (which depend on services-base)
              console.log('Step 3: Building service images...')
              this.buildImage(this.imageConfigs.services, buildOptions)
              console.log('')

              break

            case 'base': // Legacy alias for services-base
              this.buildImage(this.imageConfigs['services-base'], buildOptions)
              break

            case 'consul-server':
              this.buildImage(this.imageConfigs['consul-server'], buildOptions)
              break

            case 'services':
              this.buildImage(this.imageConfigs.services, buildOptions)
              break

            default:
              if (image && image in this.imageConfigs) {
                const config =
                  this.imageConfigs[image as keyof typeof this.imageConfigs]
                this.buildImage(config, buildOptions)
              } else {
                console.error(`Unknown image: ${image}`)
                console.log(
                  'Available images: services-base, consul-server, services, all (or base for legacy)',
                )
                process.exit(1)
              }
          }

          console.log('\nBuild process completed!')
        },
      )
      .command<PackerValidateOptions>(
        'validate [image]',
        'Validate a Packer template',
        (argv) =>
          argv
            .positional('image', {
              describe:
                'Image to validate (services-base, consul-server, services, all)',
              type: 'string',
              default: 'services-base',
            })
            .options({
              'var-file': {
                describe: 'Path to a variables file',
                type: 'string',
              },
            }),
        ({ image, varFile }) => {
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          const varFileFlag = varFile ? `-var-file="${varFile}"` : ''

          const validateImage = (config: ImageConfig) => {
            console.log(`Validating ${config.name} image template...`)
            const imageDir = join(this.packerDir, config.dir)
            execCommand(`cd ${imageDir} && packer init .`)
            execCommand(
              `cd ${imageDir} && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" ${config.template}`,
            )
          }

          switch (image) {
            case 'all':
              console.log('Validating all image templates...')

              // Validate services-base first
              console.log('Step 1: Validating services base image...')
              validateImage(this.imageConfigs['services-base'])

              // Validate consul server
              console.log('Step 2: Validating Consul server image...')
              validateImage(this.imageConfigs['consul-server'])

              // Then validate services
              console.log('Step 3: Validating service images...')
              validateImage(this.imageConfigs.services)

              break

            case 'base': // Legacy alias
              validateImage(this.imageConfigs['services-base'])
              break

            case 'consul-server':
              validateImage(this.imageConfigs['consul-server'])
              break

            case 'services':
              validateImage(this.imageConfigs.services)
              break

            case 'services-base':
              validateImage(this.imageConfigs['services-base'])
              break

            default:
              if (image && image in this.imageConfigs) {
                const config =
                  this.imageConfigs[image as keyof typeof this.imageConfigs]
                validateImage(config)
              } else {
                console.error(`Unknown image: ${image}`)
                console.log('Available images: services-base, services, all')
                process.exit(1)
              }
          }

          console.log('Validation successful!')
        },
      )
      .command(
        'list-images',
        'List Packer-built images in DigitalOcean',
        (argv) => argv,
        () => {
          console.log('Listing Packer-built images...')
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
          console.log('Initializing Packer configuration...')

          // Initialize all Packer directories
          for (const config of Object.values(this.imageConfigs)) {
            const imageDir = join(this.packerDir, config.dir)

            if (existsSync(imageDir)) {
              console.log(`Initializing ${config.name}...`)
              execCommand(`cd ${imageDir} && packer init .`)
            }
          }

          console.log('Packer initialization completed')
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

          console.log('Formatting Packer files...')
          execCommand(`packer fmt ${checkFlag} ${this.packerDir}`)

          if (!check) {
            console.log('Packer files formatted')
          }
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
      varFile?: string
    },
  ): void {
    const { debug, digitalOceanToken, force, varFile } = options

    const forceFlag = force ? '-force' : ''
    const varFileFlag = varFile ? `-var-file="${varFile}"` : ''
    const debugFlag = debug ? 'PACKER_LOG=1' : ''

    console.log(`\n📦 Building ${imageConfig.name} image...`)
    console.log(`  Directory: ${imageConfig.dir}`)
    console.log(`  Template: ${imageConfig.template}`)
    if (debug) {
      console.log('  Debug mode: enabled')
    }
    if (force) {
      console.log('  Force rebuild: enabled')
    }
    if (varFile) {
      console.log(`  Variables file: ${varFile}`)
    }

    // Clean up old snapshots before building to avoid hitting DigitalOcean limits
    console.log('\n🧹 Cleaning up old snapshots before build...')
    try {
      // Use the external cleanup script
      execCommand(
        `DO_API_TOKEN="${digitalOceanToken}" ${this.packerDir}/scripts/cleanup-old-snapshots.sh`,
      )
      console.log('✅ Old snapshots cleaned up (kept latest)')
    } catch (error) {
      console.warn('⚠️  Snapshot cleanup failed, continuing with build...')
    }

    const imageDir = join(this.packerDir, imageConfig.dir)

    // Set up cleanup handler for Ctrl+C
    const cleanup = () => {
      console.log('\n\n🧹 Cleaning up Packer build droplets...')
      try {
        // Delete all packer build droplets
        execCommand(
          'doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk \'{print $1}\' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true',
        )
        console.log('✅ Cleanup completed')
      } catch (error) {
        console.error(
          '⚠️  Cleanup failed, please manually check DigitalOcean for stuck droplets',
        )
      }
      process.exit(1)
    }

    // Register signal handlers
    process.on('SIGINT', cleanup) // Ctrl+C
    process.on('SIGTERM', cleanup) // Kill signal

    try {
      // Initialize Packer
      console.log(`\n🔧 Initializing Packer in ${imageDir}...`)
      execCommand(`cd ${imageDir} && packer init .`)

      // Build the image (Packer will fetch the latest snapshot automatically via external data source)
      console.log('\n🚀 Building image with Packer...')
      execCommand(
        `cd ${imageDir} && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" ${imageConfig.template}`,
      )

      console.log(`\n✅ ${imageConfig.name} image built successfully`)
    } finally {
      // Remove signal handlers after completion
      process.removeListener('SIGINT', cleanup)
      process.removeListener('SIGTERM', cleanup)
    }
  }
  private readonly imageConfigs = {
    'services-base': {
      name: 'services-base',
      dir: 'modules/services-base',
      template: 'services-base.pkr.hcl',
    },
    'consul-server': {
      name: 'consul-server',
      dir: 'modules/consul-server',
      template: 'consul-server.pkr.hcl',
    },
    services: {
      name: 'services',
      dir: 'modules/services',
      template: 'services.pkr.hcl',
    },
  } as const satisfies Record<string, ImageConfig>

  private readonly packerDir = 'infra/packer'
}
