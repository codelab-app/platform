import { AtomModule } from '@codelab/modules/atom-api'
import { TypeModule } from '@codelab/modules/type-api'
import { Module } from '@nestjs/common'
import { ArrayValueResolver } from './array-value.resolver'
import { InterfaceValueResolver } from './interface-value.resolver'
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
  GetArrayValuesService,
  GetPropAggregatesService,
  GetPropsService,
  UpsertPropsService,
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
  UpsertPropsService,
  GetPropAggregatesService,
]

const resolvers = [PropResolver, ArrayValueResolver, InterfaceValueResolver]

@Module({
  imports: [TypeModule, AtomModule],
  providers: [...services, ...resolvers],
  exports: [...services],
})
export class PropModule {}
