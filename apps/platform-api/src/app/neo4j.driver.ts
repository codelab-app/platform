import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloBaseDriver } from '@nestjs/apollo/dist/drivers/apollo-base.driver'
import { Injectable } from '@nestjs/common'
import { ModulesContainer } from '@nestjs/core'
import type { SubscriptionConfig } from '@nestjs/graphql'
import { extend, GqlSubscriptionService } from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { PluginsExplorerService } from './plugins-explorer.service'

@Injectable()
export class Neo4jDriver extends ApolloBaseDriver {
  private _subscriptionService?: GqlSubscriptionService

  private readonly pluginsExplorerService: PluginsExplorerService

  constructor(modulesContainer: ModulesContainer) {
    super()
    this.pluginsExplorerService = new PluginsExplorerService(modulesContainer)
  }

  public async start(options: ApolloDriverConfig) {
    if (!options.schema) {
      throw new Error('Missing schema')
    }

    options.plugins = extend(
      options.plugins || [],
      this.pluginsExplorerService.explore(options),
    )

    if (options.definitions && options.definitions.path) {
      await this.graphQlFactory.generateDefinitions(
        printSchema(options.schema),
        options,
      )
    }

    await this.registerServer(options)

    if (options.installSubscriptionHandlers || options.subscriptions) {
      const subscriptionsOptions: SubscriptionConfig =
        options.subscriptions || { 'subscriptions-transport-ws': {} }

      this._subscriptionService = new GqlSubscriptionService(
        {
          context: options.context,
          path: options.path,
          schema: options.schema,
          ...subscriptionsOptions,
        },
        this.httpAdapterHost.httpAdapter.getHttpServer(),
      )
    }
  }

  public async registerServer(apolloOptions: ApolloDriverConfig) {
    const httpAdapter = this.httpAdapterHost.httpAdapter
    const platformName = httpAdapter.getType()

    if (platformName === 'express') {
      await this.registerExpress(apolloOptions)
    } else if (platformName === 'fastify') {
      await this.registerFastify(apolloOptions)
    } else {
      throw new Error(`No support for current HttpAdapter: ${platformName}`)
    }
  }

  public async stop() {
    await this._subscriptionService?.stop()
    await super.stop()
  }
}
