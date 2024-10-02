import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { digitaloceanConfig } from './digitalocean.config'
import { DigitaloceanService } from './digitalocean.service'

@Module({
  exports: [DigitaloceanService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [digitaloceanConfig],
    }),
  ],
  providers: [DigitaloceanService],
})
export class DigitaloceanModule {}
