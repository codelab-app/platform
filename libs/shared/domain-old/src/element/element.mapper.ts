import type { IElementDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  ElementCreateInput,
  ElementDeleteInput,
  ElementUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, disconnectAll, reconnectNodeId } from '../orm'
import { propMapper } from '../prop'
import { ElementProperties } from './element.properties'

export const elementMapper: IMapper<
  IElementDto,
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
  }: IElementDto): ElementCreateInput => {
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
      props: {
        connectOrCreate: {
          onCreate: {
            node: propMapper.toCreateInput(props),
          },
          where: { node: { id: props.id } },
        },
      },
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

  toUpdateInput: ({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    closestContainerNode,
    compositeKey,
    expanded,
    firstChild,
    name,
    postRenderAction,
    preRenderAction,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
    tailwindClassNames,
  }: IElementDto): ElementUpdateInput => {
    // We need to disconnect the component if render type changed to atom or empty

    return {
      childMapperComponent: reconnectNodeId(childMapperComponent?.id),
      childMapperPreviousSibling: reconnectNodeId(
        childMapperPreviousSibling?.id,
      ),
      childMapperPropKey,
      compositeKey:
        compositeKey ??
        ElementProperties.elementCompositeKey(name, closestContainerNode),
      expanded,
      firstChild: reconnectNodeId(firstChild?.id),
      postRenderAction: reconnectNodeId(postRenderAction?.id),
      preRenderAction: reconnectNodeId(preRenderAction?.id),
      props: reconnectNodeId(props.id),
      renderForEachPropKey,
      renderIfExpression,
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
      style,
      tailwindClassNames,
    }
  },
}
