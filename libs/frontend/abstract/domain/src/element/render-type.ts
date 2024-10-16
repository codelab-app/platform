import type { Ref } from 'mobx-keystone'

import type { IAtomModel } from '../atom'
import type { IComponentModel } from '../component'

export type IElementRenderTypeModel = Ref<IAtomModel> | Ref<IComponentModel>
