import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { ElementFragment } from '../graphql/Element.fragment.v2.1.graphql.gen'
import { ElementProps } from './ElementProps'

// Renamed from 'Element' because ts doesn't pick it up, because of the native Element type
// and auto-import doesn't work
@model('@codelab/ElementModel')
export class ElementModel extends Model({
  id: idProp.withSetter(),
  order: prop<number>().withSetter(),
  parentElement: prop<Nullish<Ref<ElementModel>>>().withSetter(),
  name: prop<Nullish<string>>(),
  css: prop<Nullish<string>>(),
  atom: prop<Nullish<Ref<Atom>>>(() => null),
  children: prop<Array<Ref<ElementModel>>>(() => []),
  props: prop<Nullish<ElementProps>>(),
  propTransformationJs: prop<Nullish<string>>(),
  renderIfPropKey: prop<Nullish<string>>(),
  renderForEachPropKey: prop<Nullish<string>>(),
}) {
  @modelAction
  addChild(child: ElementModel, order?: number) {
    order = order ?? this.lastChildOrder + 1
    child.setOrder(order)
    child.setParentElement(elementRef(this))
    this.children.push(elementRef(child))
    this.children.sort((a, b) => a.current.order - b.current.order)
  }

  @computed
  get label() {
    return this.name || this.atom?.current.name || '' // TODO add this.component?.name and this.componentInstance.name to Element.label
  }

  @computed
  get childrenList() {
    return this.children.map((c) => c.current).sort((a, b) => a.order - b.order)
  }

  hasChild(id: string) {
    return !!this.children.find((c) => c.id === id)
  }

  @computed
  get lastChildOrder() {
    const list = this.childrenList

    return list.length ? list[list.length - 1].order : 1
  }

  @modelAction
  removeChild(id: string) {
    const child = this.children.find((c) => c.id === id)

    if (child) {
      this.children.splice(this.children.indexOf(child), 1)
    }
  }

  @modelAction
  updateFromFragment({
    id,
    name,
    css,
    atom,

    component,
    instanceOfComponent,

    hooks,
    propMapBindings,

    props,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    parentElementConnection,
    parentElement,
  }: Omit<ElementFragment, '__typename'>) {
    this.id = id
    this.name = name
    this.css = css
    this.propTransformationJs = propTransformationJs
    this.renderIfPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
    this.atom = atom ? atomRef(atom.id) : null

    if (props) {
      this.props?.updateFromFragment(props)
    } else {
      this.props = null
    }

    if (parentElement) {
      if (this.parentElement?.id !== parentElement.id) {
        this.parentElement?.current?.removeChild(this.id)
        this.parentElement = elementRef(parentElement.id)

        // This sets the order too
        this.parentElement.current?.addChild(
          this,
          parentElementConnection.edges[0]?.order ?? undefined,
        )
      }
    } else {
      this.parentElement = null
    }
  }

  /**
   * Creates a new element from a GraphQL fragment object. Doesn't attach any children or parent
   */
  public static fromFragment({
    id,
    name,
    css,
    atom,

    component, // TODO Element - component references, instance of component
    instanceOfComponent,

    hooks, // TODO Integrate hooks and prop map bindings if their usage is not made obsolete by the mobx platform
    propMapBindings,

    props,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    parentElementConnection,
  }: Omit<ElementFragment, '__typename'>) {
    return new ElementModel({
      id,
      name,
      css,
      atom: atom ? atomRef(atom.id) : null,
      props: props ? ElementProps.fromFragment(props) : null,
      propTransformationJs,
      renderIfPropKey,
      renderForEachPropKey,
      parentElement: null,
      order: parentElementConnection.edges[0]?.order ?? 1,
    })
  }
}

export const elementRef = rootRef<ElementModel>('ElementRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
