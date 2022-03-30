import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import {
  Frozen,
  frozen,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'

@model('@codelab/ExtraElementProps')
export class ExtraElementProps extends Model({
  elementPropMap: prop(() => objectMap<Frozen<PropsData>>()),
  global: prop<Frozen<PropsData>>(() => frozen({})),
}) {
  getForElement(elementId: string) {
    return mergeProps(this.elementPropMap.get(elementId), this.global)
  }

  @modelAction
  addForElement(elementId: string, props: PropsData) {
    this.elementPropMap.set(
      elementId,
      frozen(mergeProps(this.elementPropMap.get(elementId), props)),
    )
  }

  @modelAction
  addAll(props: PropsDataByElementId) {
    for (const [key, value] of Object.entries(props)) {
      this.addForElement(key, value)
    }
  }

  @modelAction
  setForElement(elementId: string, props: PropsData) {
    this.elementPropMap.set(elementId, frozen(props))
  }
}
