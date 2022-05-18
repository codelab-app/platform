import { IBaseRenderPipe, IRenderService } from '@codelab/shared/abstract/core'
import { idProp, Model, model, prop, Ref } from 'mobx-keystone'

@model('@codelab/BaseRenderPipe')
export class BaseRenderPipe
  extends Model({
    id: idProp,
    renderer: prop<Ref<IRenderService>>(),
  })
  implements IBaseRenderPipe {}
