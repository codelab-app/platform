import type { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import type { ModulesContainer } from '@nestjs/core/injector/modules-container'
import type { GqlModuleOptions } from '@nestjs/graphql'
import { BaseExplorerService } from '@nestjs/graphql'

export const PLUGIN_METADATA = 'graphql:plugin'

export class PluginsExplorerService extends BaseExplorerService {
  constructor(private readonly modulesContainer: ModulesContainer) {
    super()
  }

  explore(options: GqlModuleOptions) {
    const modules = this.getModules(
      this.modulesContainer,
      options.include || [],
    )

    return this.flatMap(modules, (instance) => this.filterPlugins(instance))
  }

  filterPlugins<T = unknown>(wrapper: InstanceWrapper<T>) {
    const { instance } = wrapper

    if (!instance) {
      return undefined
    }

    const metadata = Reflect.getMetadata(PLUGIN_METADATA, instance.constructor)

    return metadata ? instance : undefined
  }
}
