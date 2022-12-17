import type { IPropData } from '@codelab/frontend/abstract/core'
import {
  BUILDER_NONE_CLASS_NAME,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import { notify } from '@codelab/frontend/shared/utils'
import { mergeProps } from '@codelab/shared/utils'
import { allPropsCustomizer, getAtom } from './atoms'
import type { AtomFactoryInput, AtomFactoryResult } from './types'

/**
 * Creates a React Component and default props for it out of an node and an atom
 */
export const atomFactory = (input: AtomFactoryInput): AtomFactoryResult => {
  const { atomType, node, props } = input
  /**
   * Get ReactComponent by atomType, this takes in a module mapper to resolve the ReactComponent
   */
  const ReactComponent = getAtom(atomType)

  if (!ReactComponent) {
    notify({
      type: 'error',
      title: `Missing atom of type ${atomType} in atom type map`,
    })

    return [null, {}]
  }

  /**
   * Common props passed to all rendered atoms, we don't include runtime props here
   */
  const commonProps: IPropData = {
    [DATA_ELEMENT_ID]: node.id,
    className: BUILDER_NONE_CLASS_NAME,
  }

  let newProps = mergeProps(commonProps, props)
  // get propsCustomizer for atomType
  const propsCustomizer = allPropsCustomizer[atomType]

  if (propsCustomizer) {
    // apply propsCustomizer and get the new props
    const customizer = propsCustomizer({ atomType, node, props: newProps })

    if (customizer.props) {
      newProps = customizer.props
    }
  }

  return [ReactComponent, newProps]
}
