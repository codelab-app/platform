import { serverConfig } from '@codelab/backend/infra'
import { AtomModule } from '@codelab/backend/modules/atom'
import { SeedBaseTypesService, TypeModule } from '@codelab/backend/modules/type'
import { InfrastructureModule } from '@codelab/backend/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AtomSeeder, TypeSeeder } from './models'
import { SeederService } from './seeder.service'

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forFeature(serverConfig),
    TypeModule,
    AtomModule,
  ],
  providers: [SeedBaseTypesService, SeederService, AtomSeeder, TypeSeeder],
  exports: [SeederService],
})
export class SeederModule {}
