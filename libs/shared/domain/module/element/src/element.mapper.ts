import type { IElementDto, IMapper } from '@codelab/shared-abstract-core'
import type {
  ElementCreateInput,
  ElementDeleteInput,
  ElementUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { propMapper } from '@codelab/shared-domain-module-prop'
import {
  connectNodeId,
  disconnectAll,
  reconnectNodeId,
  reconnectNodeIds,
} from '@codelab/shared-domain-orm'

import { ElementProperties } from './element.properties'

export const elementMapper: IMapper<
  IElementDto,
  ElementCreateInput,
  ElementUpdateInput,
  ElementDeleteInput
> = {
  toCreateInput: (data: IElementDto): ElementCreateInput => {
    const {
      childMapperComponent,
      childMapperPreviousSibling,
      childMapperPropKey,
      closestContainerNode,
      compositeKey,
      firstChild,
      id,
      name,
      nextSibling,
      parentElement,
      postRenderActions,
      preRenderActions,
      prevSibling,
      props,
      renderForEachPropKey,
      renderIfExpression,
      renderType,
      style,
      tailwindClassNames,
    } = data

    return {
      childMapperComponent: connectNodeId(childMapperComponent?.id),
      childMapperPreviousSibling: connectNodeId(childMapperPreviousSibling?.id),
      childMapperPropKey,
      compositeKey:
        compositeKey ??
        ElementProperties.elementCompositeKey({ name }, closestContainerNode),
      id,
      // We only need to do one way
      // firstChild: connectNodeId(firstChild?.id),
      nextSibling: connectNodeId(nextSibling?.id),
      parentElement: connectNodeId(parentElement?.id),
      // postRenderActions: postRenderActions?.id
      //   ? connectNodeIds([postRenderActions.id])
      //   : undefined,
      // preRenderActions: preRenderActions?.id
      //   ? connectNodeIds([preRenderActions.id])
      //   : undefined,
      prevSibling: connectNodeId(prevSibling?.id),
      props: {
        create: {
          node: propMapper.toCreateInput(props),
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
    return {
      props: { where: {} },
    }
  },

  toUpdateInput: ({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    closestContainerNode,
    compositeKey,
    firstChild,
    name,
    nextSibling,
    page,
    parentComponent,
    parentElement,
    postRenderActions,
    preRenderActions,
    prevSibling,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
    tailwindClassNames,
  }: IElementDto): ElementUpdateInput => {
    return {
      childMapperComponent: reconnectNodeId(childMapperComponent?.id),
      childMapperPreviousSibling: reconnectNodeId(
        childMapperPreviousSibling?.id,
      ),
      childMapperPropKey,
      compositeKey:
        compositeKey ??
        ElementProperties.elementCompositeKey({ name }, closestContainerNode),
      firstChild: reconnectNodeId(firstChild?.id),
      nextSibling: reconnectNodeId(nextSibling?.id),
      page: reconnectNodeId(page?.id),
      parentComponent: reconnectNodeId(parentComponent?.id),
      parentElement: reconnectNodeId(parentElement?.id),
      /**
       * The generated cypher query has issues if we do both connect & disconnect, disconnect before here
       */
      postRenderActions: reconnectNodeIds(
        postRenderActions?.map((action) => action.id),
      ),

      preRenderActions: reconnectNodeIds(
        preRenderActions?.map((action) => action.id),
      ),
      prevSibling: reconnectNodeId(prevSibling?.id),
      props: reconnectNodeId(props.id),
      renderForEachPropKey,
      renderIfExpression,
      // We need to disconnect the component if render type changed to atom or empty
      renderType: {
        Atom: {
          ...disconnectAll({ omitId: renderType.id }),
          ...(renderType.__typename === 'Atom'
            ? connectNodeId(renderType.id)
            : null),
        },
        Component: {
          ...disconnectAll({ omitId: renderType.id }),
          ...(renderType.__typename === 'Component'
            ? connectNodeId(renderType.id)
            : null),
        },
      },
      style,
      // tailwindClassNames,
    }
  },
}
