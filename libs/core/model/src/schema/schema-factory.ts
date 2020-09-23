import * as mongoose from 'mongoose'
import { schemaPropsFactory } from './schema-factory--types'
import { NodeDtoSchemaI, NodeFactory } from '@codelab/shared/interface/node'

export const schemaFactory: NodeFactory<mongoose.Schema, NodeDtoSchemaI> = (
  node: NodeDtoSchemaI,
) => {
  const { props } = node
  const schemaDefinition = schemaPropsFactory(props)

  return new mongoose.Schema(schemaDefinition)
}
