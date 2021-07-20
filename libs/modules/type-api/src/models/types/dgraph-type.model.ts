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

export type DgraphTypeName =
  typeof allDgraphTypes[number]['Metadata']['modelName']

export abstract class DgraphType<
  TType extends DgraphTypeName = DgraphTypeName,
> extends DgraphModel<TType> {
  [DgraphTypeFields.name]: string
}

export const baseDgraphTypeMetadata = new DgraphModelMetadata(
  '',
  DgraphTypeFields,
)

export const baseDgraphTypeSchema: any = <
  TType extends DgraphTypeName = DgraphTypeName,
>(
  modelName: TType | undefined,
) =>
  z.object({
    ...baseFieldsZodShape(modelName),
    [DgraphTypeFields.name]: z.string(),
  })
