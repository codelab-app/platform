import { Module } from '@nestjs/common'
import { GetValueTypesService } from './use-cases'
import { ValueTypeResolver } from './valueType.resolver'

@Module({
  providers: [GetValueTypesService, ValueTypeResolver],
  exports: [],
})
export class ValueTypeModule {}
