import { idProp, Model, model, prop } from 'mobx-keystone'
import { ComponentFragment } from '../graphql/component.fragment.v2.1.graphql.gen'

const fromFragment = (component: ComponentFragment) => {
  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner?.id,
  })
}

@model('codelab/Component')
export class Component extends Model({
  id: idProp,
  name: prop<string>().withSetter(),
  rootElementId: prop<string>().withSetter(), // this isn't a Ref, because it will cause a circular dep.
  ownerId: prop<string>(),
}) {
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static fromFragment = fromFragment

  updateFromFragment(componentFragment: ComponentFragment): void {
    this.name = componentFragment.name
    this.rootElementId = componentFragment.rootElement.id
    this.ownerId = componentFragment.owner?.id
  }
}
