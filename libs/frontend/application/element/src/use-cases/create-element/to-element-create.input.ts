import type { ElementCreateInput } from '@codelab/shared/abstract/codegen'
import {
  type ICreateElementData,
  type IRef,
} from '@codelab/shared/abstract/core'
import { connectNodeId, ElementProperties } from '@codelab/shared/domain'
import { v4 } from 'uuid'

export const toElementCreateInput = (
  {
    atom,
    component,
    id,
    name,
    page,
    parentComponent,
    parentElement,
    prevSibling,
    propsData,
  }: ICreateElementData,
  closestContainerNode: IRef,
): ElementCreateInput => ({
  compositeKey: ElementProperties.elementCompositeKey(
    name,
    closestContainerNode,
  ),
  id,
  page: connectNodeId(page?.id),
  parentComponent: connectNodeId(parentComponent?.id),
  parentElement: connectNodeId(parentElement?.id),
  prevSibling: connectNodeId(prevSibling?.id),
  props: {
    create: { node: { data: JSON.stringify(propsData ?? {}), id: v4() } },
  },
  renderType: {
    Atom: atom ? { connect: { where: { node: { type: atom } } } } : undefined,
    Component: component
      ? { connect: { where: { node: { name: component } } } }
      : undefined,
  },
})
