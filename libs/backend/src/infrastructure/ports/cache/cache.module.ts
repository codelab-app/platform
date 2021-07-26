import {
  CacheModule as NestCacheModule,
  DynamicModule,
  Global,
  Module,
} from '@nestjs/common'

@Global()
@Module({})
export class CacheModule {
  static register(): DynamicModule {
    return {
      imports: [NestCacheModule.register()],
      module: CacheModule,
      exports: [NestCacheModule],
    }
  }
}
