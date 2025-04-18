import type { IPropData } from '@codelab/shared-abstract-core'

import {
  BUILDER_NONE_CLASS_NAME,
  DATA_ELEMENT_ID,
  DATA_RUNTIME_ELEMENT_KEY,
} from '@codelab/frontend-abstract-domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'

import type { AtomFactoryInput, AtomFactoryResult } from './types'

import { allPropsCustomizer, getAtom } from './atoms'

/**
 * Creates a React Component and default props for it out of an node and an atom
 */
export const atomFactory = ({
  atom,
  props,
  runtimeElement,
}: AtomFactoryInput): AtomFactoryResult => {
  /**
   * Get ReactComponent by atomType, this takes in a module mapper to resolve the ReactComponent
   */
  const ReactComponent = getAtom(atom.type)

  if (!ReactComponent && !atom.externalSourceType) {
    throw new Error(`Missing atom of type ${atom.type} in atom type map`)
  }

  /**
   * Common props passed to all rendered atoms, we don't include runtime props here
   */
  const commonProps: IPropData = {
    className: BUILDER_NONE_CLASS_NAME,
    [DATA_ELEMENT_ID]: runtimeElement.element.current.id,
    [DATA_RUNTIME_ELEMENT_KEY]: runtimeElement.compositeKey,
  }

  let newProps = mergeProps(commonProps, props)
  // get propsCustomizer for atomType
  const propsCustomizer = allPropsCustomizer[atom.type]

  if (propsCustomizer) {
    // apply propsCustomizer and get the new props
    const customizer = propsCustomizer({
      atom,
      props: newProps,
      runtimeElement,
    })

    if (customizer.props) {
      newProps = customizer.props
    }
  }

  return [ReactComponent, newProps]
}
