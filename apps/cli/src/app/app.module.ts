import { PuppeteerModule, SeedDbModule } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { DgraphCliModule } from '../dgraph-cli'
import { SeederModule } from '../seeder'
import { TsParserModule } from '../ts-parser'
import { AppService } from './app.service'

@Module({
  imports: [
    ConsoleModule,
    SeedDbModule,
    SeederModule,
    PuppeteerModule,
    DgraphCliModule,
    TsParserModule,
  ],
  controllers: [AppService],
})
export class AppModule {}
