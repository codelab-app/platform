import { notify } from '@codelab/frontend/shared/utils'
import { AtomType } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import React from 'react'
import { atomFactory } from '../atoms/atomFactory'

type Identifiable = { id: string }

interface AtomElementFactoryInput<TNode extends Identifiable = Identifiable> {
  atomType: AtomType
  node: TNode
}

type IElementPropTransformerFn = (
  input: AtomElementFactoryInput & { props: Record<string, any> },
) => any

type IElementsPropTransformers = Partial<
  Record<AtomType, IElementPropTransformerFn>
>

export type ReactComponentFactoryResult = [
  Nullable<React.ComponentType<any> | string>,
  Record<string, any>,
]

export const commonProps = (id: string) => ({
  'data-id': id,
  className: 'Builder-none',
})

/**
 * This is a mapping of prop transformers for certain elements.
 * Add a transformer here if you want to modify or add props to a specific element type
 */
export const elementsPropTransformers: IElementsPropTransformers = {
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
  [AtomType.AntDesignModal]: ({ props }) => ({
    ...props,
    getContainer: '#render-root',
  }),
  [AtomType.ReactFragment]: ({ props: { key } }) => ({ key }), // Do not pass in any props for fragments, except key, because it creates an error
  [AtomType.HtmlImage]: (input) => ({ src: '', alt: '' }),
}

/**
 * Creates a React Component and default props for it out of an node and an atom
 */
export const reactComponentFactory = <
  TNode extends Identifiable = Identifiable,
>(
  input: AtomElementFactoryInput<TNode>,
): ReactComponentFactoryResult => {
  const { atomType, node } = input

  if (!atomType || !node) {
    return [null, {}]
  }

  const ReactComponent = atomFactory(atomType)

  if (!ReactComponent) {
    notify({
      type: 'error',
      title: `Missing atom of type ${atomType} in atom type map`,
    })

    return [null, {}]
  }

  let props = commonProps(node.id)
  const propsTransformer = elementsPropTransformers[atomType]

  if (propsTransformer) {
    props = propsTransformer({ atomType, node, props })
  }

  return [ReactComponent, props]
}
