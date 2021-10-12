import { serverConfig } from '@codelab/backend/infra'
import { AtomModule } from '@codelab/backend/modules/atom'
import { TagModule } from '@codelab/backend/modules/tag'
import { SeedBaseTypesService, TypeModule } from '@codelab/backend/modules/type'
import { InfrastructureModule } from '@codelab/backend/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AtomSeeder, HookSeeder, TypeSeeder } from './models'
import { SeederService } from './seeder.service'

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forFeature(serverConfig),
    TypeModule,
    AtomModule,
    TagModule,
  ],
  providers: [
    SeedBaseTypesService,
    SeederService,
    AtomSeeder,
    TypeSeeder,
    HookSeeder,
  ],
  exports: [SeederService],
})
export class SeederModule {}
