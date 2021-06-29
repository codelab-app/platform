import {
  baseFieldsZodShape,
  DgraphModel,
  DgraphModelMetadata,
} from '@codelab/backend'
import { z } from 'zod'
import { allDgraphTypes } from './allDgraphTypes'

export enum DgraphTypeFields {
  name = 'Type.name',
}

export type DgraphTypeModel =
  typeof allDgraphTypes[number]['Metadata']['modelName']

export abstract class DgraphType<
  TType extends DgraphTypeModel = DgraphTypeModel,
> extends DgraphModel<TType> {
  [DgraphTypeFields.name]: string
}

export const baseDgraphTypeMetadata = new DgraphModelMetadata(
  '',
  DgraphTypeFields,
)

export const baseDgraphTypeSchema = (modelName: DgraphTypeModel | undefined) =>
  z.object({
    ...baseFieldsZodShape(modelName),
    [DgraphTypeFields.name]: z.string(),
  })
