import * as mongoose from 'mongoose'
import { schemaPropsFactory } from './schema-factory--types'
import { NodeFactory, SchemaI } from '@codelab/shared/interface/node'

export const schemaFactory: NodeFactory<mongoose.Schema, SchemaI> = (
  node: SchemaI,
) => {
  const { props } = node
  const schemaDefinition = schemaPropsFactory(props)

  return new mongoose.Schema(schemaDefinition)
}
