import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'

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
              describe: 'Image to build (base, all)',
              type: 'string',
              default: 'base',
            })
            .options({
              force: {
                alias: 'f',
                describe: 'Force a build even if artifacts exist',
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
          const packerDir = 'infra/packer'
          const forceFlag = force ? '-force' : ''
          const varFileFlag = varFile ? `-var-file="${varFile}"` : ''
          const debugFlag = debug ? 'PACKER_LOG=1' : ''

          // Get DigitalOcean token with validation
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          switch (image) {
            case 'all':
              console.log('Building all images...')
              // Build app base image
              console.log('Building app base image...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              // Build neo4j base image
              console.log('Building neo4j base image...')
              execCommand(`cd ${packerDir}/neo4j && packer init .`)
              execCommand(
                `cd ${packerDir}/neo4j && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-neo4j-base.pkr.hcl`,
              )
              break

            case 'app':
              console.log('Building app base image...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              break

            case 'base':
              // Legacy alias for app
              console.log('Building app base image...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              break

            case 'neo4j':
              console.log('Building neo4j base image...')
              execCommand(`cd ${packerDir}/neo4j && packer init .`)
              execCommand(
                `cd ${packerDir}/neo4j && ${debugFlag} packer build ${forceFlag} ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-neo4j-base.pkr.hcl`,
              )
              break

            default:
              console.error(`Unknown image: ${image}`)
              console.log(
                'Available images: app, neo4j, all (or base for legacy)',
              )
              process.exit(1)
          }

          console.log('Build completed successfully!')
        },
      )
      .command<PackerValidateOptions>(
        'validate [image]',
        'Validate a Packer template',
        (argv) =>
          argv
            .positional('image', {
              describe: 'Image to validate (base, all)',
              type: 'string',
              default: 'base',
            })
            .options({
              'var-file': {
                describe: 'Path to a variables file',
                type: 'string',
              },
            }),
        ({ image, varFile }) => {
          const packerDir = 'infra/packer'
          const varFileFlag = varFile ? `-var-file="${varFile}"` : ''

          // Get DigitalOcean token with validation
          const digitalOceanToken = get('DIGITALOCEAN_API_TOKEN')
            .required()
            .asString()

          switch (image) {
            case 'all':
              console.log('Validating all image templates...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              execCommand(`cd ${packerDir}/neo4j && packer init .`)
              execCommand(
                `cd ${packerDir}/neo4j && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-neo4j-base.pkr.hcl`,
              )
              break

            case 'app':
              console.log('Validating app image template...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              break

            case 'base':
              // Legacy alias for app
              console.log('Validating app image template...')
              execCommand(`cd ${packerDir}/app && packer init .`)
              execCommand(
                `cd ${packerDir}/app && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-app-base.pkr.hcl`,
              )
              break

            case 'neo4j':
              console.log('Validating neo4j image template...')
              execCommand(`cd ${packerDir}/neo4j && packer init .`)
              execCommand(
                `cd ${packerDir}/neo4j && packer validate ${varFileFlag} -var "do_token=${digitalOceanToken}" codelab-neo4j-base.pkr.hcl`,
              )
              break

            default:
              console.error(`Unknown image: ${image}`)
              console.log(
                'Available images: app, neo4j, all (or base for legacy)',
              )
              process.exit(1)
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
            'doctl compute image list --public=false | grep "codelab-base"',
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
                grep "codelab-base" |
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
                  if [[ $name == codelab-base* ]]; then
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
          const packerDir = 'infra/packer'

          // Initialize all Packer directories
          execCommand(`cd ${packerDir}/base && packer init .`)

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
          const packerDir = 'infra/packer'
          const checkFlag = check ? '-check' : ''

          console.log('Formatting Packer files...')
          execCommand(`packer fmt ${checkFlag} ${packerDir}`)

          if (!check) {
            console.log('Packer files formatted')
          }
        },
      )
      .demandCommand(1, 'Please provide a command')
  }

  handler(args: ArgumentsCamelCase) {
    // Handler implementation if needed
  }
}
