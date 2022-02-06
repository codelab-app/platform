import * as Types from '@codelab/shared/abstract/codegen-v2';

import { gql } from '@apollo/client';
export type ElementBaseFragment = { __typename: 'Element', id: string, name?: string | null | undefined, css?: string | null | undefined, props?: string | null | undefined, hooks?: Array<string> | null | undefined, renderForEachPropKey?: string | null | undefined, renderIfPropKey?: string | null | undefined, propTransformationJs?: string | null | undefined, instanceOfComponent?: { id: string } | null | undefined, parentElement?: { id: string, name?: string | null | undefined } | null | undefined, atom?: { id: string, name: string, type: Types.AtomType } | null | undefined, componentTag?: { id: string, name: string } | null | undefined, propMapBindings?: Array<{ id: string, sourceKey: string, targetKey: string }> | null | undefined };

export type ElementEdgeFragment = { source: string, target: string, order: number };

export type ElementGraphFragment = { vertices?: Array<ElementBaseFragment> | null | undefined, edges?: Array<ElementEdgeFragment> | null | undefined };

export type ElementFragment = { __typename: 'Element', id: string, name?: string | null | undefined, css?: string | null | undefined, props?: string | null | undefined, hooks?: Array<string> | null | undefined, renderForEachPropKey?: string | null | undefined, renderIfPropKey?: string | null | undefined, propTransformationJs?: string | null | undefined, instanceOfComponent?: { id: string } | null | undefined, parentElement?: { id: string, name?: string | null | undefined } | null | undefined, atom?: { id: string, name: string, type: Types.AtomType } | null | undefined, graph?: ElementGraphFragment | null | undefined, componentTag?: { id: string, name: string } | null | undefined, propMapBindings?: Array<{ id: string, sourceKey: string, targetKey: string }> | null | undefined };

export const ElementBaseFragmentDoc = gql`
    fragment ElementBase on Element {
  __typename
  id
  name
  css
  instanceOfComponent {
    id
  }
  parentElement {
    id
    name
  }
  atom {
    id
    name
    type
  }
  componentTag {
    id
    name
  }
  props
  hooks
  renderForEachPropKey
  renderIfPropKey
  propMapBindings {
    id
    sourceKey
    targetKey
  }
  propTransformationJs
}
    `;
export const ElementEdgeFragmentDoc = gql`
    fragment ElementEdge on ElementEdge {
  source
  target
  order
}
    `;
export const ElementGraphFragmentDoc = gql`
    fragment ElementGraph on IElementGraph {
  vertices {
    ...ElementBase
  }
  edges {
    ...ElementEdge
  }
}
    ${ElementBaseFragmentDoc}
${ElementEdgeFragmentDoc}`;
export const ElementFragmentDoc = gql`
    fragment Element on Element {
  __typename
  id
  name
  css
  instanceOfComponent {
    id
  }
  parentElement {
    id
    name
  }
  atom {
    id
    name
    type
  }
  graph {
    ...ElementGraph
  }
  componentTag {
    id
    name
  }
  props
  hooks
  renderForEachPropKey
  renderIfPropKey
  propMapBindings {
    id
    sourceKey
    targetKey
  }
  propTransformationJs
}
    ${ElementGraphFragmentDoc}`;