import { serverConfig } from '@codelab/backend/infra'
import { AtomModule } from '@codelab/backend/modules/atom'
import { SeedBaseTypesService, TypeModule } from '@codelab/backend/modules/type'
import { NestjsModule } from '@codelab/backend/shared/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AtomSeeder, HookSeeder, TypeSeeder } from './models'
import { SeederService } from './seeder.service'

@Module({
  imports: [
    // Infrastructure
    NestjsModule,
    //
    ConfigModule.forFeature(serverConfig),
    TypeModule,
    AtomModule,
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
