import { GroupsDetails } from '../templates/ObjectFieldTabsTemplate'
import {
  getReflectClassDecorator,
  reflectClassDecorator,
} from './decorator-reflect--class'

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? UiGroup<T[P]> & RecursivePartial<T[P]>
    : never
}
type UiGroup<T> = {
  'ui:groups': GroupsDetails<T>
}
export type GroupsUiSchema<T = any> = UiGroup<T> & RecursivePartial<T>

export const tabsDecoratorMetaKey = 'tabs'

export const Tabs = <T = any>(params?: GroupsUiSchema<T>) =>
  reflectClassDecorator(tabsDecoratorMetaKey, params)

export const getTabsDecoratorDetails = (
  classWithGridDecorator: any,
): GroupsUiSchema | null => {
  const decoratorDetails = getReflectClassDecorator(
    classWithGridDecorator,
    tabsDecoratorMetaKey,
  )

  if (Object.entries(decoratorDetails).length === 0) {
    return null
  }

  return decoratorDetails as GroupsUiSchema
}
