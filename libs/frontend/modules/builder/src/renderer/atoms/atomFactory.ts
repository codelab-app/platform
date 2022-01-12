import {
  BUILDER_NONE_CLASS_NAME,
  DATA_ID,
} from '@codelab/frontend/abstract/core'
import { notify } from '@codelab/frontend/shared/utils'
import { PropsData } from '@codelab/shared/abstract/core'
import { atomPropsCustomizer, atoms } from './atoms'
import { AtomFactoryInput, AtomFactoryResult } from './types'

/**
 * Creates a React Component and default props for it out of an node and an atom
 */
export const atomFactory = (input: AtomFactoryInput): AtomFactoryResult => {
  const { atomType, node } = input

  if (!atomType || !node) {
    return [null, {}]
  }

  /**
   * get ReactComponent by atomType
   */
  const ReactComponent = atoms[atomType]

  if (!ReactComponent) {
    notify({
      type: 'error',
      title: `Missing atom of type ${atomType} in atom type map`,
    })

    return [null, {}]
  }

  // common props passed to all rendered atoms
  let props: PropsData = {
    [DATA_ID]: node.id,
    className: BUILDER_NONE_CLASS_NAME,
  }

  // get propsCustomizer for atomType
  const propsCustomizer = atomPropsCustomizer[atomType]

  if (propsCustomizer) {
    // apply propsCustomizer and get the new props
    props = propsCustomizer({ atomType, node, props })
  }

  return [ReactComponent, props]
}
