import type { Argv, CommandModule } from 'yargs'

import { $, $stream, globalHandler } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'

interface K8sDeployParams extends StageParam {
  tag?: string
}

interface K8sServiceParams extends StageParam {
  service: string
}

interface K8sScaleParams extends K8sServiceParams {
  replicas: number
}

interface K8sPortForwardParams extends StageParam {
  port?: number
  service: string
}

@Injectable()
export class KubernetesService implements CommandModule<unknown, unknown> {
  aliases = ['kubernetes']
  command = 'k8s'
  describe = 'Kubernetes commands'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .options({
        ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
      })
      .middleware([loadStageMiddleware])
      .command<StageParam>(
        'init',
        'Create and bootstrap Kubernetes cluster',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)
          console.log(
            `🚀 Initializing Kubernetes cluster for ${environment}...`,
          )

          // Create cluster
          $stream.sync`./infra/kubernetes/scripts/setup/create-cluster.sh ${environment}`

          // Bootstrap cluster
          $stream.sync`./infra/kubernetes/scripts/setup/bootstrap-cluster.sh ${environment}`

          console.log('✅ Kubernetes cluster initialized successfully')
        }),
      )
      .command<K8sDeployParams>(
        'deploy',
        'Deploy applications to Kubernetes',
        (argv) =>
          argv.option('tag', {
            describe: 'Docker image tag to deploy',
            type: 'string',
            default: 'latest',
          }),
        globalHandler(({ stage, tag }) => {
          const environment = this.getEnvironmentName(stage)
          console.log(`🚀 Deploying to ${environment} with tag: ${tag}`)

          // Create secrets if they don't exist
          this.ensureSecrets(environment)

          // Update kustomization with new image tags
          if (tag && tag !== 'latest') {
            this.updateImageTags(environment, tag)
          }

          // Apply Kubernetes manifests
          $stream.sync`kubectl apply -k infra/kubernetes/environments/${environment}`

          // Wait for deployments
          this.waitForDeployments(environment)

          console.log('✅ Deployment completed successfully')
          $stream.sync`kubectl -n ${environment} get pods`
        }),
      )
      .command<StageParam>(
        'migrate',
        'Migrate data to Kubernetes (Neo4j)',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)
          const sourceHost = this.getSourceHost(stage)

          console.log(
            `🔄 Migrating Neo4j data from ${sourceHost} to Kubernetes...`,
          )

          $stream.sync`./infra/kubernetes/scripts/migration/migrate-neo4j.sh ${environment} ${sourceHost}`

          console.log('✅ Data migration completed successfully')
        }),
      )
      .command<K8sPortForwardParams>(
        'port-forward',
        'Port forward a service to localhost',
        (argv) =>
          argv
            .option('service', {
              describe: 'Service to port forward',
              type: 'string',
              demandOption: true,
              choices: ['api', 'web', 'landing', 'sites', 'neo4j'],
            })
            .option('port', {
              describe: 'Local port (defaults to service port)',
              type: 'number',
            }),
        globalHandler(({ port, service, stage }) => {
          const environment = this.getEnvironmentName(stage)
          const localPort = port || this.getDefaultPort(service)
          const targetPort = this.getTargetPort(service)

          console.log(
            `🔌 Port forwarding ${service} from ${environment} to localhost:${localPort}`,
          )

          if (service === 'neo4j') {
            // Neo4j needs multiple ports
            $stream.sync`kubectl -n ${environment} port-forward statefulset/neo4j 7474:7474 7687:7687`
          } else {
            $stream.sync`kubectl -n ${environment} port-forward deployment/${service} ${localPort}:${targetPort}`
          }
        }),
      )
      .command<K8sServiceParams>(
        'logs',
        'View logs for a service',
        (argv) =>
          argv.option('service', {
            describe: 'Service to view logs',
            type: 'string',
            demandOption: true,
            choices: ['api', 'web', 'landing', 'sites', 'neo4j'],
          }),
        globalHandler(({ service, stage }) => {
          const environment = this.getEnvironmentName(stage)
          const selector =
            service === 'neo4j' ? 'statefulset/neo4j' : `deployment/${service}`

          console.log(`📜 Streaming logs for ${service} in ${environment}...`)
          $stream.sync`kubectl -n ${environment} logs -f ${selector}`
        }),
      )
      .command<K8sScaleParams>(
        'scale',
        'Scale a deployment',
        (argv) =>
          argv
            .option('service', {
              describe: 'Service to scale',
              type: 'string',
              demandOption: true,
              choices: ['api', 'web', 'landing', 'sites'],
            })
            .option('replicas', {
              describe: 'Number of replicas',
              type: 'number',
              demandOption: true,
            }),
        globalHandler(({ replicas, service, stage }) => {
          const environment = this.getEnvironmentName(stage)

          console.log(
            `⚖️ Scaling ${service} to ${replicas} replicas in ${environment}...`,
          )
          $stream.sync`kubectl -n ${environment} scale deployment/${service} --replicas=${replicas}`

          // Wait for scaling to complete
          $stream.sync`kubectl -n ${environment} rollout status deployment/${service}`

          console.log('✅ Scaling completed successfully')
          $stream.sync`kubectl -n ${environment} get deployment ${service}`
        }),
      )
      .command<StageParam>(
        'rollback',
        'Rollback deployments to previous version',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)
          const services = ['api', 'web', 'landing', 'sites']

          console.log(`⏪ Rolling back deployments in ${environment}...`)

          for (const service of services) {
            console.log(`Rolling back ${service}...`)
            $stream.sync`kubectl -n ${environment} rollout undo deployment/${service}`
          }

          // Wait for rollbacks to complete
          for (const service of services) {
            $stream.sync`kubectl -n ${environment} rollout status deployment/${service}`
          }

          console.log('✅ Rollback completed successfully')
          $stream.sync`kubectl -n ${environment} get deployments`
        }),
      )
      .command<StageParam>(
        'cleanup',
        'Clean up Kubernetes resources',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)

          console.log(
            `🧹 Cleaning up Kubernetes resources in ${environment}...`,
          )

          // Delete all resources in namespace
          $stream.sync`kubectl delete -k infra/kubernetes/environments/${environment}`

          // Optionally delete the namespace
          console.log('Namespace preserved. To delete it, run:')
          console.log(`kubectl delete namespace ${environment}`)

          console.log('✅ Cleanup completed')
        }),
      )
      .command<StageParam>(
        'status',
        'Show cluster and deployment status',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)

          console.log(`📊 Kubernetes status for ${environment}:`)
          console.log('\n🔹 Nodes:')
          $stream.sync`kubectl get nodes`

          console.log('\n🔹 Deployments:')
          $stream.sync`kubectl -n ${environment} get deployments`

          console.log('\n🔹 Pods:')
          $stream.sync`kubectl -n ${environment} get pods`

          console.log('\n🔹 Services:')
          $stream.sync`kubectl -n ${environment} get services`

          console.log('\n🔹 Ingress:')
          $stream.sync`kubectl -n ${environment} get ingress`
        }),
      )
      .command<StageParam>(
        'secrets',
        'Create or update secrets',
        (argv) => argv,
        globalHandler(({ stage }) => {
          const environment = this.getEnvironmentName(stage)

          console.log(`🔐 Managing secrets for ${environment}...`)
          $stream.sync`./infra/kubernetes/scripts/utilities/get-secrets.sh ${environment}`

          console.log('⚠️  Please update the secrets with actual values!')
        }),
      )
      .demandCommand(1, 'Please provide a command')
  }

  handler() {
    //
  }

  private ensureSecrets(environment: string): void {
    // Check if secrets exist
    const result = $.sync`kubectl -n ${environment} get secrets --no-headers 2>/dev/null | grep -E "(neo4j|auth0|supabase)" || true`

    if (!result.stdout.trim()) {
      console.log('📝 Creating required secrets...')
      $stream.sync`./infra/kubernetes/scripts/utilities/get-secrets.sh ${environment}`
    }
  }

  private getDefaultPort(service: string): number {
    const portMap: Record<string, number> = {
      api: 4000,
      web: 3000,
      landing: 3001,
      sites: 3002,
      neo4j: 7474,
    }
    return portMap[service] || 3000
  }

  private getEnvironmentName(stage: string): string {
    const stageMap: Record<string, string> = {
      [Stage.Prod]: 'production',
      [Stage.Dev]: 'development',
      [Stage.Test]: 'staging',
      [Stage.CI]: 'staging',
    }
    return stageMap[stage] || stage
  }

  private getSourceHost(stage: string): string {
    const hostMap: Record<string, string> = {
      [Stage.Prod]: 'neo4j.codelab.app',
      [Stage.Test]: 'neo4j-staging.codelab.app',
      [Stage.CI]: 'neo4j-staging.codelab.app',
      [Stage.Dev]: 'localhost',
    }
    return hostMap[stage] || 'localhost'
  }

  private getTargetPort(service: string): number {
    const portMap: Record<string, number> = {
      api: 4000,
      web: 3000,
      landing: 3000,
      sites: 3000,
      neo4j: 7474,
    }
    return portMap[service] || 3000
  }

  private updateImageTags(environment: string, tag: string): void {
    console.log(`🏷️  Updating image tags to ${tag}...`)
    const kustomizationPath = `infra/kubernetes/environments/${environment}/kustomization.yaml`

    // Update image tags in kustomization.yaml
    const services = ['api', 'web', 'landing', 'sites']
    for (const service of services) {
      $stream.sync`kubectl -n ${environment} set image deployment/${service} ${service}=registry.digitalocean.com/codelabapp/${service}:${tag} --dry-run=client -o yaml | kubectl apply -f -`
    }
  }

  private waitForDeployments(environment: string): void {
    console.log('⏳ Waiting for deployments to be ready...')
    const deployments = ['api', 'web', 'landing', 'sites']

    for (const deployment of deployments) {
      $stream.sync`kubectl -n ${environment} rollout status deployment/${deployment} --timeout=300s`
    }
  }
}
