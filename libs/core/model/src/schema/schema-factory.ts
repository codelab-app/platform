import * as mongoose from 'mongoose'
import { schemaPropsFactory } from './schema-factory--types'
import { NodeDtoSchemaA, NodeFactory } from '@codelab/shared/interface/node'

export const schemaFactory: NodeFactory<mongoose.Schema, NodeDtoSchemaA> = (
  node: NodeDtoSchemaA,
) => {
  const { props } = node
  const schemaDefinition = schemaPropsFactory(props)

  return new mongoose.Schema(schemaDefinition)
}
