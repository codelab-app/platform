import { IComponent, IComponentDTO } from '@codelab/shared/abstract/core'
import { idProp, Model, model, prop } from 'mobx-keystone'

const fromFragment = (component: IComponentDTO) => {
  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner?.id,
  })
}

@model('codelab/Component')
export class Component
  extends Model({
    id: idProp,
    name: prop<string>().withSetter(),
    rootElementId: prop<string>().withSetter(), // this isn't a Ref, because it will cause a circular dep.
    ownerId: prop<string>(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static fromFragment = fromFragment

  hydrate(componentFragment: IComponentDTO): void {
    this.name = componentFragment.name
    this.rootElementId = componentFragment.rootElement.id
    this.ownerId = componentFragment.owner?.id
  }
}
