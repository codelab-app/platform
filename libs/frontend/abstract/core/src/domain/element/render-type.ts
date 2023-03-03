import { RenderTypeKind } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { IAtom } from '../atom'
import type { IComponent } from '../component'

/**
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __RenderTypeKind {
  Component = 'Component',
  Atom = 'Atom',
}

export { RenderTypeKind as IRenderTypeKind }

export type IElementRenderType = Ref<IAtom> | Ref<IComponent>
