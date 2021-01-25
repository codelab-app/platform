import { DynamicModule, Global, Module } from '@nestjs/common'
import { DatabaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { ConfigDITokens } from './ConfigDITokens'

@Global()
@Module({})
export class ConfigModule {
  static register(config: DatabaseConfig): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigDITokens.ConfigService,
          useValue: config,
        },
      ],
      exports: [ConfigDITokens.ConfigService],
    }
  }
}
