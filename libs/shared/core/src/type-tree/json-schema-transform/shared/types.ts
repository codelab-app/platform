import { IType, ITypeEdge } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { AddChildToNodeFn } from '../../../tree'

export type TypeTransformFn<T = IType> = (
  type: T,
  options: Maybe<TransformTypeOptions>,
) => Record<string, any>

export type AddTypeToSchemaFn = AddChildToNodeFn<
  IType,
  ITypeEdge,
  Record<string, any>
>

export interface TransformTypeOptions {
  /** Use this to add data to the property definitions for specific types  */
  extraProperties?: (type: IType) => Record<string, any>
}
