import { PuppeteerModule, SeedDbModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { E2eModule } from '../e2e'
import { GraphqlCodegenModule } from '../graphql-codegen/graphql-codegen.module'
import { SeederModule } from '../seeder'
import { AppService } from './app.service'

@Module({
  imports: [
    ConsoleModule,
    GraphqlCodegenModule,
    SeedDbModule,
    SeederModule,
    PuppeteerModule,
    E2eModule,
  ],
  controllers: [AppService],
})
export class AppModule {}
