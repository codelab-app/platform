import type { IExtraElementProps } from '@codelab/frontend/abstract/core'
import {
  IElementRef,
  IPropData,
  IPropDataByElementId,
} from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import type { Frozen } from 'mobx-keystone'
import {
  frozen,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { whereEq } from 'ramda'

@model('@codelab/ExtraElementProps')
export class ExtraElementProps
  extends Model({
    elementPropMap: prop(() => objectMap<Frozen<IPropData>>()),
    global: prop<Frozen<IPropData>>(() => frozen({})).withSetter(),
  })
  implements IExtraElementProps
{
  getForElement(elementId: string) {
    return mergeProps(
      this.elementPropMap.get(elementId)?.data,
      this.global.data,
    )
  }

  @modelAction
  addForElement(elementId: string, props: IPropData) {
    const currentProps = this.getForElement(elementId)

    if (!whereEq(props, currentProps)) {
      this.elementPropMap.set(
        elementId,
        frozen(mergeProps(currentProps, props)),
      )
    }
  }

  @modelAction
  addAll(props: IPropDataByElementId) {
    for (const [key, value] of Object.entries(props)) {
      this.addForElement(key, value)
    }
  }

  @modelAction
  setAll(props: IPropDataByElementId) {
    for (const [key, value] of Object.entries(props)) {
      this.setForElement(key, value)
    }
  }

  @modelAction
  setForElement(element: IElementRef, props: IPropData) {
    this.elementPropMap.set(element, frozen(props))
  }
}
