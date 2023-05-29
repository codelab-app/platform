import type { IPropData } from '@codelab/frontend/abstract/core'
import {
  BUILDER_NONE_CLASS_NAME,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import { notify } from '@codelab/frontend/shared/utils'
import { AtomType } from '@codelab/shared/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import get from 'lodash/get'
import { allPropsCustomizer, getAtom } from './atoms'
import { dynamicLoader } from './dynamic-loader'
import type { AtomFactoryInput, AtomFactoryResult } from './types'

/**
 * Creates a React Component and default props for it out of an node and an atom
 */
export const atomFactory = (input: AtomFactoryInput): AtomFactoryResult => {
  const { atom, node, props } = input
  const atomTypeName = atom.externalSourceType ?? atom.type

  /**
   * Get ReactComponent by atomType, this takes in a module mapper to resolve the ReactComponent
   */
  const ReactComponent = atom.externalSourceType
    ? get(window, `externalComponents.${atom.externalSourceType}`)
      ? dynamicLoader(() =>
          get(window, `externalComponents.${atom.externalSourceType}`),
        )
      : getAtom(AtomType.ReactFragment)
    : getAtom(atom.type)

  if (!ReactComponent) {
    notify({
      title: `Missing atom of type ${atomTypeName} in atom type map`,
      type: 'error',
    })

    return [null, {}]
  }

  /**
   * Common props passed to all rendered atoms, we don't include runtime props here
   */
  const commonProps: IPropData = {
    className: BUILDER_NONE_CLASS_NAME,
    [DATA_ELEMENT_ID]: node.id,
  }

  let newProps = mergeProps(commonProps, props)
  // get propsCustomizer for atomType
  const propsCustomizer = allPropsCustomizer[atom.type]

  if (propsCustomizer) {
    // apply propsCustomizer and get the new props
    const customizer = propsCustomizer({
      atom,
      node,
      props: newProps,
    })

    if (customizer.props) {
      newProps = customizer.props
    }
  }

  return [ReactComponent, newProps]
}
