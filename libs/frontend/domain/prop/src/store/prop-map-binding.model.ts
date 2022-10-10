import type {
  IElementRef,
  IPropData,
  IPropMapBinding,
  IPropMapBindingDTO,
} from '@codelab/frontend/abstract/core'
import { BINDING_WILDCARD } from '@codelab/frontend/abstract/core'
import get from 'lodash/get'
import isObjectLike from 'lodash/isObjectLike'
import set from 'lodash/set'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const hydrate = (fragment: IPropMapBindingDTO) => {
  return new PropMapBinding({
    id: fragment.id,
    targetElementId: fragment.targetElement ? fragment.targetElement.id : '',
    sourceKey: fragment.sourceKey,
    targetKey: fragment.targetKey,
  })
}

@model('@codelab/PropMapBinding')
export class PropMapBinding
  extends Model({
    id: idProp,
    // if null -> target is current element
    targetElementId: prop<IElementRef>(),
    // '*' binds all incoming props
    sourceKey: prop<string>(),
    // '*' spreads all props
    targetKey: prop<string>(),
  })
  implements IPropMapBinding
{
  @modelAction
  writeCache(fragment: IPropMapBindingDTO) {
    this.id = fragment.id
    this.sourceKey = fragment.sourceKey
    this.targetKey = fragment.targetKey
    this.targetElementId = fragment.targetElement
      ? fragment.targetElement.id
      : ''

    return this
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

  public static hydrate = hydrate
}
