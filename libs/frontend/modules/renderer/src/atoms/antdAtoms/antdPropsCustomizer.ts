import {
  DATA_GRID,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { getAtom } from '../atoms'
import { AtomCustomizer, AtomCustomizerFn } from '../types'

const antDesignRglItemFn: AtomCustomizerFn = ({ node, props }) => ({
  // Currently the react-grid-layout library, for some reason, re-renders the layout
  // only if it detects a change in the key of the child, and doesn't care about the data-grid property
  // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
  // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo
  props: {
    ...props,
    key: props[DATA_GRID] ? JSON.stringify(props[DATA_GRID]) : node.id,
  },
})

const antDesignRglResponsiveContainerFn: AtomCustomizerFn = ({ props }) => ({
  props: {
    ...props,
    // onResizeStop: onResizeStop(handlers),
    style: {
      width: '200px',
      height: '200px',
    },
  },
})

const antDesignModalFn: AtomCustomizerFn = ({ props }) => ({
  props: {
    ...props,
    getContainer: `#${ROOT_RENDER_CONTAINER_ID}`,
  },
})

/**
 * Ant design icon needs to import the destructured version, but will populate our atom space if we have an atom for each icon type.
 *
 * Instead we move the icon type to the props, and use the key to destructure our icon default import
 */
const antDesignIconFn: AtomCustomizerFn = ({ atomType, props }) => {
  console.log(atomType)

  // We use a custom prop `iconName` to determine which icon to use
  const iconName = props['iconName']

  const ReactComponent = getAtom(atomType, (mod: any) => {
    console.log(mod)

    return mod[iconName]
  })

  console.log(props, ReactComponent)

  return {
    component: ReactComponent,
  }
}

export const antdPropsCustomizer: AtomCustomizer = {
  [IAtomType.AntDesignRglItem]: antDesignRglItemFn,
  [IAtomType.AntDesignRglResponsiveContainer]:
    antDesignRglResponsiveContainerFn,
  [IAtomType.AntDesignModal]: antDesignModalFn,
  [IAtomType.AntDesignIcon]: antDesignIconFn,
}
