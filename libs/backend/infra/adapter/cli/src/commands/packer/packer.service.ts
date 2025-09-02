import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { $, $stream, globalHandler } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { join } from 'path'

enum PackerImage {
  Api = 'api',
  Base = 'base', // Must be first - services depend on it
  ConsulServer = 'consul-server',
  Grafana = 'grafana',
  Landing = 'landing',
  Neo4j = 'neo4j',
  Sites = 'sites',
  Web = 'web',
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

interface PackerGetLatestSnapshotOptions {
  digitaloceanApiToken: string
  service: string
}

interface PackerCleanupOptions {
  digitaloceanApiToken: string
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
        globalHandler(({ consulEncryptKey, digitaloceanApiToken, images }) => {
          const buildOptions = {
            consulEncryptKey,
            digitaloceanApiToken,
          }

          // Build images in order from enum (base is first)
          for (const image of images) {
            this.buildImage(image, buildOptions)
          }
        }),
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
        globalHandler(({ consulEncryptKey, digitaloceanApiToken, images }) => {
          const servicesDir = join(this.packerDir, 'images')

          // Initialize once for all validations
          $stream.sync({ cwd: servicesDir })`packer init .`

          // Build the -only flag for validation
          const onlyFlags = images
            .map((image) => {
              return `digitalocean.${image}`
            })
            .join(',')

          console.log(`Validating ${images.length} image(s)...`)

          // Validate all requested images at once
          $stream.sync`cd ${servicesDir} && packer validate -only='${onlyFlags}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`
        }),
      )
      .command(
        'list-images',
        'List Packer-built images in DigitalOcean',
        (argv) => argv,
        globalHandler(() => {
          $stream.sync`doctl compute image list --public=false | grep "codelab-.*-base"`
        }),
      )
      .command(
        'init',
        'Initialize Packer configuration',
        (argv) => argv,
        globalHandler(() => {
          // Initialize the images directory
          const servicesDir = join(this.packerDir, 'images')
          $stream.sync({ cwd: servicesDir })`packer init .`
        }),
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
        globalHandler(({ check }) => {
          if (check) {
            $stream.sync`packer fmt -check ${this.packerDir}`
          } else {
            $stream.sync`packer fmt ${this.packerDir}`
          }
        }),
      )
      .command<PackerGetLatestSnapshotOptions>(
        'get-latest-snapshot',
        'Get the latest snapshot ID',
        (argv) =>
          argv.middleware(this.fetchDigitalOceanToken).option('service', {
            describe: 'Service name (default: base)',
            type: 'string',
            default: 'base',
          }),
        globalHandler(({ digitaloceanApiToken, service }) => {
          const pattern = `codelab-${service}`
          const result = $.sync({
            verbose: false,
            env: {
              ...process.env,
              DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
            },
          })`doctl compute snapshot list --format ID,Name,CreatedAt --no-header | grep ${pattern} | sort -k3 -r | head -1 | awk '{print $1}'`
          const output = result.stdout.trim()

          if (!output) {
            console.error(`Error: No snapshot found for service: ${service}`)
            process.exit(1)
          }

          // Output JSON format for Packer's external data source
          console.log(JSON.stringify({ id: output }))
        }),
      )
      .command<PackerCleanupOptions>(
        'cleanup',
        'Clean up old Packer snapshots (keeps only latest)',
        (argv) => argv.middleware(this.fetchDigitalOceanToken),
        globalHandler(({ digitaloceanApiToken }) => {
          const services = Object.values(PackerImage).map((image) => ({
            pattern: `codelab-${image}-`,
            name: image,
          }))
          const keepCount = 1

          for (const service of services) {
            console.log(`\nProcessing: ${service.name}`)

            // Get all snapshots for this service, sorted by name (includes timestamp)
            const result = $.sync({
              verbose: false,
              env: {
                ...process.env,
                DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
              },
            })`doctl compute snapshot list --format ID,Name --no-header | grep "${service.pattern}" | sort -k2 -r || true`
            const output = result.stdout.trim()

            if (!output) {
              console.log(`  No snapshots found for ${service.name}`)
              continue
            }

            const snapshots = output.split('\n').filter(Boolean)
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
                $.sync({
                  verbose: false,
                  env: {
                    ...process.env,
                    DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
                  },
                })`doctl compute snapshot delete ${snapshotId} --force || true`
              }
            }
          }

          console.log('\nCleanup completed!')
          console.log('\nCurrent snapshots:')
          $.sync({
            verbose: false,
            env: {
              ...process.env,
              DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
            },
          })`doctl compute snapshot list --format Name,Size,CreatedAt | grep -E "(codelab-|Name)" || true`
        }),
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
    image: PackerImage,
    options: {
      consulEncryptKey: string
      digitaloceanApiToken: string
    },
  ): void {
    const { consulEncryptKey, digitaloceanApiToken } = options

    console.log(`Building ${image}...`)

    // Clean up old snapshots before building to avoid hitting DigitalOcean limits
    const cleanupPattern = `codelab-${image}-`
    const cleanupResult = $.sync({
      verbose: false,
      env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
    })`doctl compute snapshot list --format ID,Name --no-header | grep "${cleanupPattern}" | sort -k2 -r | tail -n +2 || true`
    const cleanupOutput = cleanupResult.stdout.trim()

    if (cleanupOutput) {
      const oldSnapshots = cleanupOutput.split('\n').filter(Boolean)
      for (const snapshot of oldSnapshots) {
        const [id] = snapshot.split(/\s+/)
        console.log(`Deleting old snapshot: ${id}`)
        $.sync({
          env: {
            ...process.env,
            DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
          },
        })`doctl compute snapshot delete ${id} --force || true`
      }
    }

    const imageDir = join(this.packerDir, 'images')

    // Set up cleanup handler for Ctrl+C
    const cleanup = () => {
      // Delete all packer build droplets (best effort)
      $.sync`doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk '{print $1}' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true`
      process.exit(1)
    }

    // Register signal handlers
    process.on('SIGINT', cleanup) // Ctrl+C
    process.on('SIGTERM', cleanup) // Kill signal

    try {
      // Initialize Packer
      $stream.sync`cd ${imageDir} && packer init .`

      // Build the image with -only flag to specify which source
      // All images are now in the same directory, using -only to select specific source
      $stream.sync`cd ${imageDir} && packer build -only='digitalocean.${image}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`
    } finally {
      // Remove signal handlers after completion
      process.removeListener('SIGINT', cleanup)
      process.removeListener('SIGTERM', cleanup)
    }
  }

  // Reusable middleware functions
  private fetchConsulEncryptKey = (args: ArgumentsCamelCase) => {
    console.log('Fetching CONSUL_ENCRYPT_KEY from prod-packer workspace...')
    const result = $.sync({
      cwd: 'infra/terraform/environments/prod-packer',
    })`terraform output -raw consul_encrypt_key`
    args['consulEncryptKey'] = result.stdout.trim()
    console.log('✓ CONSUL_ENCRYPT_KEY fetched successfully')
  }

  private fetchDigitalOceanToken = (args: ArgumentsCamelCase) => {
    const digitaloceanApiToken = get('DIGITALOCEAN_API_TOKEN')
      .required()
      .asString()
    args['digitaloceanApiToken'] = digitaloceanApiToken
  }
  private readonly packerDir = 'infra/packer'
}
