import { DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Prop } from '../prop'
import { ArrayValue, InterfaceValue, PropValue } from '../values'
import { PropAggregate } from './prop-aggregate.model'

@Injectable()
export class PropAggregateMapper implements IDgraphMapper<Prop, PropAggregate> {
  async map(input: DeepPartial<Prop>) {
    const prop = Prop.Schema.parse(input)
    const aggregate = new PropAggregate()

    aggregate.rootProp = prop
    aggregate.props = []
    aggregate.values = []

    const visitedValueIds = new Set<string>()
    const visitedPropIds = new Set<string>()

    const visitValue = (visitingValue: PropValue, iteration = 0) => {
      if (iteration > 1000) {
        throw new Error('Prop too nested')
      }

      if (visitedValueIds.has(visitingValue.id)) {
        return
      }

      aggregate.values.push(visitingValue)
      visitedValueIds.add(visitingValue.id)

      if (visitingValue instanceof ArrayValue) {
        visitingValue.values?.forEach((arrayValue) =>
          visitValue(arrayValue, iteration + 1),
        )
      } else if (visitingValue instanceof InterfaceValue) {
        visitingValue.props?.forEach((interfaceProp) =>
          visitProp(interfaceProp, iteration + 1),
        )
      }
    }

    const visitProp = (visitingProp: Prop, iteration = 0) => {
      if (iteration > 1000) {
        throw new Error('Prop too nested')
      }

      if (visitedPropIds.has(visitingProp.id)) {
        return
      }

      aggregate.props.push(visitingProp)

      if (visitingProp.value) {
        visitValue(visitingProp.value, iteration + 1)
      }

      visitedPropIds.add(visitingProp.id)
    }

    PropAggregate.Schema.parse(aggregate)

    return aggregate
  }
}
