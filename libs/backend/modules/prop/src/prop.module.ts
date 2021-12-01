import { Module } from '@nestjs/common'
import { PropResolver } from './application/prop.resolver'
import { CreatePropService } from './use-cases/create-prop'
import { UpdatePropService } from './use-cases/update-prop'

@Module({
  imports: [],
  providers: [CreatePropService, UpdatePropService, PropResolver],
  exports: [CreatePropService, UpdatePropService],
})
export class PropModule {}
