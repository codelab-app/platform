import {
  DgraphArrayInnerValueFragment,
  DgraphArrayValueFragment,
  DgraphPropValueFragment,
} from '@codelab/codegen/dgraph'
import { ArrayValue } from '../array-value'
import { BooleanValue } from '../boolean-value'
import { FloatValue } from '../float-value'
import { IntValue } from '../int-value'
import { InterfaceValue } from '../interface-value'
import { StringValue } from '../string-value'

export const mapGqlFragmentToValue = (
  d: DgraphPropValueFragment | DgraphArrayInnerValueFragment,
  iteration = 0,
) => {
  if (iteration > 100) {
    throw new Error('Value too nested')
  }

  switch (d.__typename) {
    case 'StringValue':
      return new StringValue(d.id, d.stringValue)
    case 'IntValue':
      return new IntValue(d.id, d.intValue)
    case 'FloatValue':
      return new FloatValue(d.id, d.floatValue)
    case 'BooleanValue':
      return new BooleanValue(d.id, d.booleanValue)

    case 'ArrayValue': {
      const arrayValue = new ArrayValue(d.id)

      if ((d as DgraphArrayValueFragment).values) {
        arrayValue.values = (d as DgraphArrayValueFragment).values.map((v) =>
          mapGqlFragmentToValue(v, iteration + 1),
        )
      }

      return arrayValue
    }

    case 'InterfaceValue':
      return new InterfaceValue(d.id)
    default:
      throw new Error(
        `Dgraph value type ${(d as any).__typename} not recognized`,
      )
  }
}
