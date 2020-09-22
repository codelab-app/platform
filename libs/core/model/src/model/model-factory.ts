import * as mongoose from 'mongoose'
import { NodeDtoModelA } from '@codelab/shared/interface/node'

export const modelFactory = (node: NodeDtoModelA, schema: mongoose.Schema) => {
  if (!schema) {
    throw new Error('Missing schema as children')
  }

  return {
    schema,
    model: mongoose.model(node.props.name, schema),
  }
}
