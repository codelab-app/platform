import type { Ref } from 'mobx-keystone'
import type { IAtom } from '../atom'
import type { IComponent } from '../component'

export type IElementRenderType = Ref<IAtom> | Ref<IComponent>
