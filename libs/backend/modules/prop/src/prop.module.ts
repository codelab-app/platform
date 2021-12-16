import { Module } from '@nestjs/common'
import { PropResolver } from './application/prop.resolver'
import { PropInfrastructureModule } from './infrastructure'
import { CreatePropService } from './use-cases/create-prop'
import { GetPropService } from './use-cases/get-prop/get-prop.service'
import { UpdatePropService } from './use-cases/update-prop'

@Module({
  imports: [],
  providers: [
    GetPropService,
    CreatePropService,
    UpdatePropService,
    PropResolver,
  ],
  exports: [GetPropService, CreatePropService, UpdatePropService],
})
export class PropCoreModule {}

@Module({
  imports: [PropCoreModule, PropInfrastructureModule],
  providers: [],
  exports: [PropCoreModule, PropInfrastructureModule],
})
export class PropModule {}
