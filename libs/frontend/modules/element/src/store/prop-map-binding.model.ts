import { BINDING_WILDCARD } from '@codelab/frontend/abstract/core'
import { IPropData } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { get, isObjectLike, set } from 'lodash'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'
import { PropMapBindingFragment } from '../graphql/element.fragment.graphql.gen'
import type { Element } from './element.model'
import { elementRef } from './element.ref'

@model('codelab/PropMapBinding')
export class PropMapBinding extends Model({
  id: idProp,
  targetElement: prop<Nullable<Ref<Element>>>(), // if null -> target is current element
  sourceKey: prop<string>(), // '*' binds all incoming props
  targetKey: prop<string>(), // '*' spreads all props
}) {
  @modelAction
  public updateFromFragment(fragment: PropMapBindingFragment) {
    this.id = fragment.id
    this.sourceKey = fragment.sourceKey
    this.targetKey = fragment.targetKey
    this.targetElement = fragment.targetElement
      ? elementRef(fragment.targetElement.id)
      : null
  }

  applyBindings(sourceProps: IPropData): IPropData {
    const value =
      this.sourceKey === BINDING_WILDCARD
        ? sourceProps
        : get(sourceProps, this.sourceKey)

    if (
      this.targetKey === BINDING_WILDCARD &&
      (value === null || isObjectLike(value))
    ) {
      return { ...value }
    }

    const newProps = {}

    set(newProps, this.targetKey, value)

    return newProps
  }

  public static fromFragment(fragment: PropMapBindingFragment) {
    return new PropMapBinding({
      id: fragment.id,
      targetElement: fragment.targetElement
        ? elementRef(fragment.targetElement.id)
        : null,
      sourceKey: fragment.sourceKey,
      targetKey: fragment.targetKey,
    })
  }
}
