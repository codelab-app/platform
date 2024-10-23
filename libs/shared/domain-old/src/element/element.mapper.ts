import type {
  ICreateElementData,
  IElementCreateDto,
  IElementDto,
  IMapper,
} from '@codelab/shared/abstract/core'
import type {
  ElementCreateInput,
  ElementDeleteInput,
  ElementUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, disconnectAll, reconnectNodeId } from '../orm'
import { ElementProperties } from './element.properties'

export const elementMapper: IMapper<
  IElementCreateDto,
  ElementCreateInput,
  ElementUpdateInput,
  ElementDeleteInput
> = {
  toCreateInput: ({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    closestContainerNode,
    compositeKey,
    expanded,
    firstChild,
    id,
    name,
    nextSibling,
    parentElement,
    postRenderAction,
    preRenderAction,
    prevSibling,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
    tailwindClassNames,
  }: IElementCreateDto): ElementCreateInput => {
    return {
      childMapperComponent: connectNodeId(childMapperComponent?.id),
      childMapperPreviousSibling: connectNodeId(childMapperPreviousSibling?.id),
      childMapperPropKey,
      compositeKey:
        compositeKey ??
        ElementProperties.elementCompositeKey(name, closestContainerNode),
      expanded,
      id,
      // We only need to do one way
      // firstChild: connectNodeId(firstChild?.id),
      nextSibling: connectNodeId(nextSibling?.id),
      parentElement: connectNodeId(parentElement?.id),
      postRenderAction: connectNodeId(postRenderAction?.id),
      preRenderAction: connectNodeId(preRenderAction?.id),
      prevSibling: connectNodeId(prevSibling?.id),
      props: connectNodeId(props.id),
      renderForEachPropKey,
      renderIfExpression,
      renderType: {
        Atom:
          renderType.__typename === 'Atom'
            ? connectNodeId(renderType.id)
            : undefined,
        Component:
          renderType.__typename === 'Component'
            ? connectNodeId(renderType.id)
            : undefined,
      },
      style,
      tailwindClassNames,
    }
  },

  toDeleteInput: (): ElementDeleteInput => {
    return {}
  },

  // toUpdateNodesInput: ({
  //   name,
  //   expanded,
  //   closestContainerNode,
  //   firstChild,
  //   nextSibling,
  //   parentElement,
  //   prevSibling,
  // }: IElementDto): ElementUpdateInput => {
  //   return {
  //     compositeKey: ElementProperties.elementCompositeKey(
  //       name,
  //       closestContainerNode,
  //     ),
  //     expanded,
  //     firstChild: connectNodeId(firstChild?.id),
  //     nextSibling: connectNodeId(nextSibling?.id),
  //     parentElement: connectNodeId(parentElement?.id),
  //     prevSibling: connectNodeId(prevSibling?.id),
  //   }
  // },

  toUpdateInput: ({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    closestContainerNode,
    compositeKey,
    id,
    name,
    props,
    renderType,
  }: IElementCreateDto): ElementUpdateInput => {
    return {
      childMapperComponent: connectNodeId(childMapperComponent?.id),
      childMapperPreviousSibling: connectNodeId(childMapperPreviousSibling?.id),
      childMapperPropKey,
      compositeKey:
        compositeKey ??
        ElementProperties.elementCompositeKey(name, closestContainerNode),
      props: reconnectNodeId(props.id),
      renderType: {
        Atom:
          renderType.__typename === 'Atom'
            ? connectNodeId(renderType.id)
            : disconnectAll({ omitId: renderType.id }),
        Component:
          renderType.__typename === 'Component'
            ? connectNodeId(renderType.id)
            : disconnectAll({ omitId: renderType.id }),
      },
    }
  },
}
