import { RenderTypeKind } from '@codelab/shared/abstract/codegen'
import type { IRenderTypeKind } from '.'

/**
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __RenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export { RenderTypeKind as IRenderTypeKind }

export type IComponentID = string

export type IAtomID = string

export interface RenderType {
  // This is the ID of either `atom` or `component`
  id: IAtomID | IComponentID
  kind: IRenderTypeKind
}
