import { __AtomFragment, AtomType } from '@codelab/codegen/graphql'
import { notify } from '@codelab/frontend/shared'
import React from 'react'
import { atomFactory } from './atomFactory'

interface AtomElementFactoryProps<
  TNode extends { id: string } = { id: string },
> {
  atom: __AtomFragment
  node: TNode
}

/**
 * This is a mapping of prop transformers for certain elements.
 * Add a transformer here if you want to modify or add props to a specific element type
 */
export const elementsPropTransformers: {
  [K in AtomType]?: (
    input: AtomElementFactoryProps & { props: Record<string, any> },
  ) => any
} = {
  [AtomType.AntDesignRglItem]: ({ node, props }) => {
    // Currently the react-grid-layout library, for some reason, re-renders the layout
    // only if it detects a change in the key of the child, and doesn't care about the data-grid property
    // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
    // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo

    return {
      ...props,
      key: props['data-grid'] ? JSON.stringify(props['data-grid']) : node.id,
      'data-id': node.id,
    }
  },
  [AtomType.AntDesignRglResponsiveContainer]: ({ props }) => ({
    ...props,
    // onResizeStop: onResizeStop(handlers),
    style: {
      width: '200px',
      height: '200px',
    },
  }),
  [AtomType.ReactFragment]: ({ props: { key } }) => ({ key }), // Do not pass in any props for fragments, except key, because it creates an error
}

const commonProps = (id: string) => ({
  'data-id': id,
  key: id,
  className: 'Builder-none',
})

/**
 * Creates a React Component and default props for it out of a node and an atom
 * Pass in handlers to modify the behavior of the rendered HTML element
 */
export const reactComponentFactory = <
  TNode extends { id: string } = { id: string },
>({
  atom,
  node,
}: AtomElementFactoryProps<TNode>): [
  React.ComponentType<any> | string | null,
  Record<string, any>,
] => {
  if (!atom || !atom.type || !node) {
    return [null, {}]
  }

  const ReactComponent = atomFactory(atom.type)

  if (!ReactComponent) {
    notify({
      type: 'error',
      title: `Missing atom of type ${atom.type} in atom type map`,
    })

    return [null, {}]
  }

  let props = commonProps(node.id)
  const propsTransformer = elementsPropTransformers[atom.type]

  if (propsTransformer) {
    props = propsTransformer({ atom, node, props })
  }

  return [ReactComponent, props]
}
