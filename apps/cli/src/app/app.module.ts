import { PuppeteerModule, SeedDbModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { E2eModule } from '../e2e'
import { GraphqlCodegenModule } from '../graphql-codegen/graphql-codegen.module'

@Module({
  imports: [
    ConsoleModule,
    GraphqlCodegenModule,
    SeedDbModule,
    PuppeteerModule,
    E2eModule,
  ],
})
export class AppModule {}
