import { Module } from '@nestjs/common'
import { PropResolver } from './prop.resolver'
import { GetPropsService } from './use-cases'

@Module({
  providers: [GetPropsService, PropResolver],
  exports: [],
})
export class PropModule {}
