import * as mongoose from 'mongoose'
import { ModelA } from '@codelab/alpha/shared/interface/node'

export const modelFactory = (node: ModelA, schema: mongoose.Schema) => {
  if (!schema) {
    throw new Error('Missing schema as children')
  }

  return {
    schema,
    model: mongoose.model(node.props.name, schema),
  }
}
