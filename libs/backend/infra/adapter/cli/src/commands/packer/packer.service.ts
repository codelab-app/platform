import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
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
              describe: 'Image to build (app, services, all)',
              type: 'string',
              default: 'app',
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
          // Get DigitalOcean token from environment - access directly from process.env
          // since getEnv() is initialized before ConfigModule loads the .env file
          const digitalOceanToken = process.env['DIGITALOCEAN_API_TOKEN']

          if (!digitalOceanToken) {
            console.error(
              '❌ Error: DIGITALOCEAN_API_TOKEN is not set or empty',
            )
            console.error(
              'Please add your DigitalOcean API token to apps/cli/.env:',
            )
            console.error('  DIGITALOCEAN_API_TOKEN=your_actual_token_here')
            console.error(
              '\nYou can get a token from: https://cloud.digitalocean.com/account/api/tokens',
            )
            process.exit(1)
          }

          const buildOptions = {
            debug,
            digitalOceanToken,
            force,
            varFile,
          }

          switch (image) {
            case 'all':
              console.log('Building all images...\n')

              // Build app first (base image)
              console.log('Step 1: Building base image...')
              this.buildImage(this.imageConfigs.app, buildOptions)
              console.log('')

              // Then build services (which depend on app)
              console.log('Step 2: Building service images...')
              this.buildImage(this.imageConfigs.services, buildOptions)
              console.log('')

              break

            case 'base': // Legacy alias for app
              this.buildImage(this.imageConfigs.app, buildOptions)
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
                  'Available images: app, services, all (or base for legacy)',
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
              describe: 'Image to validate (app, services, all)',
              type: 'string',
              default: 'app',
            })
            .options({
              'var-file': {
                describe: 'Path to a variables file',
                type: 'string',
              },
            }),
        ({ image, varFile }) => {
          const digitalOceanToken = process.env['DIGITALOCEAN_API_TOKEN']

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

              // Validate app first
              console.log('Step 1: Validating base image...')
              validateImage(this.imageConfigs.app)

              // Then validate services
              console.log('Step 2: Validating service images...')
              validateImage(this.imageConfigs.services)

              break

            case 'app':
              validateImage(this.imageConfigs.app)
              break

            case 'base': // Legacy alias
              validateImage(this.imageConfigs.app)
              break

            case 'services':
              validateImage(this.imageConfigs.services)
              break

            default:
              if (image && image in this.imageConfigs) {
                const config =
                  this.imageConfigs[image as keyof typeof this.imageConfigs]
                validateImage(config)
              } else {
                console.error(`Unknown image: ${image}`)
                console.log('Available images: app, services, all')
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
        'clean-images',
        'Remove old Packer-built images (keeps latest 3)',
        (argv) =>
          argv.options({
            'dry-run': {
              describe: 'Show what would be deleted without deleting',
              type: 'boolean',
              default: false,
            },
          }),
        ({ 'dry-run': dryRun }) => {
          console.log('Finding old Packer images to clean...')

          if (dryRun) {
            console.log('DRY RUN - No images will be deleted')
            execCommand(`
              doctl compute image list --public=false --format ID,Name,Created --no-header |
              grep "codelab-.*-base" |
              sort -k3 -r |
              tail -n +4 |
              awk '{print "Would delete: " $2 " (ID: " $1 ", Created: " $3 ")"}'
            `)
          } else {
            console.log('Deleting old images (keeping latest 3)...')
            execCommand(`
              doctl compute image list --public=false --format ID --no-header |
              grep -E "^[0-9]+" |
              while read id; do
                name=$(doctl compute image get $id --format Name --no-header)
                if [[ $name == codelab-*-base* ]]; then
                  echo "Found: $name (ID: $id)"
                fi
              done |
              sort -r |
              tail -n +4 |
              awk '{print $3}' |
              xargs -I {} doctl compute image delete {} --force
            `)
          }
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

    const imageDir = join(this.packerDir, imageConfig.dir)

    // Initialize Packer
    console.log(`\n🔧 Initializing Packer in ${imageDir}...`)
    execCommand(`cd ${imageDir} && packer init .`)

    // Build the image
    console.log('\n🚀 Building image with Packer...')
    execCommand(
      `cd ${imageDir} && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" ${imageConfig.template}`,
    )

    console.log(`\n✅ ${imageConfig.name} image built successfully`)
  }
  private readonly imageConfigs = {
    app: {
      name: 'app',
      dir: 'app',
      template: 'codelab-app-base.pkr.hcl',
    },
    services: {
      name: 'services',
      dir: 'services',
      template: 'codelab-services.pkr.hcl',
    },
  } as const satisfies Record<string, ImageConfig>

  private readonly packerDir = 'infra/packer'
}
