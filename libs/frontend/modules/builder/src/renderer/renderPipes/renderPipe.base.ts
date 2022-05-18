import { IRenderService } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

@model('@codelab/BaseRenderPipe')
export class BaseRenderPipe extends Model({
  renderer: prop<IRenderService>(),
}) {}
