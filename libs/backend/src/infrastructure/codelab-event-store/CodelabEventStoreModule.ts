import {
  EventStoreFeatureAsyncOptions,
  EventStoreModuleAsyncOptions,
  EventStoreModuleOptions,
  EventStoreOptionConfig,
} from '@juicycleff/nestjs-event-store'
import { DynamicModule, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CodelabEventStoreCoreModule } from './CodelabEventStoreCoreModule'

@Module({
  imports: [CqrsModule],
})
export class CodelabEventStoreModule {
  static register(option: EventStoreModuleOptions): DynamicModule {
    return {
      module: CodelabEventStoreModule,
      imports: [CodelabEventStoreCoreModule.register(option)],
    }
  }

  static registerAsync(option: EventStoreModuleAsyncOptions): DynamicModule {
    return {
      module: CodelabEventStoreModule,
      imports: [CodelabEventStoreCoreModule.registerAsync(option)],
    }
  }

  static registerFeature(config: EventStoreOptionConfig): DynamicModule {
    return {
      module: CodelabEventStoreModule,
      imports: [CodelabEventStoreCoreModule.registerFeature(config)],
    }
  }

  static registerFeatureAsync(
    options: EventStoreFeatureAsyncOptions,
  ): DynamicModule {
    return {
      module: CodelabEventStoreModule,
      imports: [CodelabEventStoreCoreModule.registerFeatureAsync(options)],
    }
  }
}
