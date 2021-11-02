import { Module } from '@nestjs/common'
import { TsParserService } from './ts-parser.service'

@Module({
  imports: [],
  providers: [TsParserService],
  exports: [TsParserService],
})
export class TsParserModule {}
