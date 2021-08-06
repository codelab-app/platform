import { AuthModule, DgraphModule, serverConfig } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SeederService } from './seeder.service'

@Module({
  imports: [DgraphModule, AuthModule, ConfigModule.forFeature(serverConfig)],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
