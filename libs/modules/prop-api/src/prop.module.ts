import { PageElementModule } from '@codelab/modules/page-element-api'
import { TypeModule } from '@codelab/modules/type-api'
import { Module } from '@nestjs/common'
import { ArrayValueResolver } from './array-value.resolver'
import { InterfaceValueResolver } from './interface-value.model'
import {
  ArrayValueMapper,
  BooleanValueMapper,
  FloatValueMapper,
  InterfaceValueMapper,
  IntValueMapper,
  PropAggregateMapper,
  PropMapper,
  PropValueMapper,
  StringValueMapper,
} from './models'
import { PropResolver } from './prop.resolver'
import {
  CreatePropService,
  GetArrayValuesService,
  GetPropAggregatesService,
  GetPropsService,
} from './use-cases'

const mappers = [
  PropMapper,
  ArrayValueMapper,
  BooleanValueMapper,
  FloatValueMapper,
  IntValueMapper,
  InterfaceValueMapper,
  PropValueMapper,
  StringValueMapper,
  PropAggregateMapper,
]

const services = [
  ...mappers,
  GetArrayValuesService,
  GetPropsService,
  CreatePropService,
  GetPropAggregatesService,
]

const resolvers = [PropResolver, ArrayValueResolver, InterfaceValueResolver]

@Module({
  imports: [TypeModule, PageElementModule],
  providers: [...services, ...resolvers],
  exports: [...services],
})
export class PropModule {}
