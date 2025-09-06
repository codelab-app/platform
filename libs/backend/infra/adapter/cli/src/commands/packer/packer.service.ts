import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { $, $stream, globalHandler } from '@codelab/backend-infra-adapter-shell'
import { Injectable } from '@nestjs/common'
import { get } from 'env-var'
import { join } from 'path'

import type {
  PackerBuildOptions,
  PackerCleanupOptions,
  PackerGetLatestSnapshotOptions,
  PackerValidateOptions,
} from './packer.types'

import { PackerImage } from './packer.types'

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
          const imageDir = join(this.packerDir, 'images')

          // Set up cleanup handler for Ctrl+C
          const cleanup = () => {
            this.cleanupDroplets(digitaloceanApiToken)
            this.cleanupSnapshots(images, digitaloceanApiToken)
          }

          try {
            $stream.sync`cd ${imageDir} && packer init .`

            // Check if base image is in the list and needs to be built first
            const hasBase = images.includes(PackerImage.Base)
            const otherImages = images.filter((img) => img !== PackerImage.Base)

            if (hasBase) {
              // Build base image first
              console.log('Building base image first...')
              this.createImages(
                [PackerImage.Base],
                imageDir,
                consulEncryptKey,
                digitaloceanApiToken,
              )
            }

            // Build remaining images in parallel
            this.createImages(
              otherImages,
              imageDir,
              consulEncryptKey,
              digitaloceanApiToken,
            )
          } finally {
            cleanup()
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
          $stream.sync`cd ${servicesDir} && packer validate -timestamp-ui -only='${onlyFlags}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`
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
          const snapshotId = this.getLatestSnapshot(
            service,
            digitaloceanApiToken,
          )

          if (!snapshotId) {
            console.error(`Error: No snapshot found for service: ${service}`)
            process.exit(1)
          }

          // Output JSON format for Packer's external data source
          console.log(JSON.stringify({ id: snapshotId }))
        }),
      )
      .command<PackerCleanupOptions>(
        'cleanup',
        'Clean up old Packer snapshots (keeps only latest)',
        (argv) => argv.middleware(this.fetchDigitalOceanToken),
        globalHandler(({ digitaloceanApiToken }) => {
          this.cleanupSnapshots(
            Object.values(PackerImage),
            digitaloceanApiToken,
          )
        }),
      )
      .demandCommand(1, 'Please provide a command')
  }

  handler(_args: ArgumentsCamelCase) {
    // Handler implementation if needed
  }

  /**
   * Clean up Packer droplets
   */
  private cleanupDroplets(digitaloceanApiToken: string): void {
    $.sync({
      env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
    })`doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk '{print $1}' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true`
  }

  /**
   * Clean up old snapshots for given images
   */
  private cleanupSnapshots(
    images: Array<PackerImage>,
    digitaloceanApiToken: string,
  ): void {
    const allSnapshots = this.getAllSnapshots(digitaloceanApiToken)

    // Group snapshots by image type and collect old ones to delete
    const idsToDelete = images.flatMap((image) => {
      // Filter snapshots for this image type
      const imageSnapshots = allSnapshots
        .filter((snap) => snap.name.includes(`codelab-${image}-`))
        // Sort by creation date descending (newest first)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )

      if (imageSnapshots.length > 0) {
        console.log(`Found ${imageSnapshots.length} snapshots for ${image}:`)
        console.log(
          `  Keeping: ${imageSnapshots[0]?.name} (${imageSnapshots[0]?.createdAt})`,
        )
        if (imageSnapshots.length > 1) {
          console.log(
            `  Deleting: ${imageSnapshots
              .slice(1)
              .map((snap) => snap.name)
              .join(', ')}`,
          )
        }
      }

      // Return IDs of all except the newest
      return imageSnapshots.slice(1).map((snapshot) => snapshot.id)
    })

    // Delete all snapshots in a single command
    if (idsToDelete.length > 0) {
      console.log(
        `Deleting ${idsToDelete.length} old snapshots: ${idsToDelete.join(
          ' ',
        )}`,
      )
      $.sync({
        env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
      })`doctl compute snapshot delete ${idsToDelete} --force || true`
    }

    console.log('\nCurrent snapshots:')
    const pattern = images.map((img) => `codelab-${img}-`).join('\\|')
    $.sync({
      env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
    })`doctl compute snapshot list --format Name,Size,CreatedAt | (grep "${pattern}" || true)`
  }

  /**
   * Create Packer images
   */
  private createImages(
    images: Array<PackerImage>,
    imageDir: string,
    consulEncryptKey: string,
    digitaloceanApiToken: string,
  ): void {
    $stream.sync`cd ${imageDir} && packer build -timestamp-ui -only='${images
      .map((img) => `digitalocean.${img}`)
      .join(
        ',',
      )}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`
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

  /**
   * Get all snapshots from DigitalOcean
   */
  private getAllSnapshots(digitaloceanApiToken: string): Array<{
    id: string
    name: string
    createdAt: string
  }> {
    const result = $.sync({
      verbose: false,
      env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
    })`doctl compute snapshot list --format ID,Name,CreatedAt --no-header`

    return result.stdout
      .trim()
      .split('\n')
      .filter((line) => line)
      .map((line) => {
        const parts = line.split(/\s+/)
        return {
          id: parts[0]!,
          name: parts[1]!,
          createdAt: parts.slice(2).join(' '),
        }
      })
  }

  /**
   * Get the latest snapshot for a specific service
   */
  private getLatestSnapshot(
    service: string,
    digitaloceanApiToken: string,
  ): string | null {
    const pattern = `codelab-${service}`
    const snapshots = this.getAllSnapshots(digitaloceanApiToken)
      .filter((snap) => snap.name.includes(pattern))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

    return snapshots[0]?.id || null
  }
  private readonly packerDir = 'infra/packer'
}
