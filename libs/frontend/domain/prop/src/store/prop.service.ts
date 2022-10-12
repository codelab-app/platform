import { IProp, IPropService } from '@codelab/frontend/abstract/core'
import { idProp, Model, model, objectMap, prop } from 'mobx-keystone'

@model('@codelab/PropService')
export class PropService
  extends Model({
    id: idProp,
    props: prop(() => objectMap<IProp>()),
  })
  implements IPropService
{
  prop(id: string) {
    return this.props.get(id)
  }
}
