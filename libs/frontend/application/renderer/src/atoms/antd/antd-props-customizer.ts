import {
  DATA_GRID,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/domain'
import { IAtomType } from '@codelab/shared/abstract/core'

import type { AtomCustomizer, AtomCustomizerFn } from '../types'

const antDesignRglItemFn: AtomCustomizerFn = ({ props, runtimeElement }) => ({
  // Currently the react-grid-layout library, for some reason, re-renders the layout
  // only if it detects a change in the key of the child, and doesn't care about the data-grid property
  // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
  // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo
  props: {
    ...props,
    key: props[DATA_GRID]
      ? JSON.stringify(props[DATA_GRID])
      : runtimeElement.element.id,
  },
})

const antDesignRglResponsiveContainerFn: AtomCustomizerFn = ({ props }) => ({
  props: {
    ...props,
    // onResizeStop: onResizeStop(handlers),
    style: {
      height: '200px',
      width: '200px',
    },
  },
})

const antDesignModalFn: AtomCustomizerFn = ({ props }) => ({
  props: {
    ...props,
    getContainer: `#${ROOT_RENDER_CONTAINER_ID}`,
  },
})

export const antdPropsCustomizer: AtomCustomizer = {
  [IAtomType.AntDesignDrawer]: antDesignModalFn,
  // [IAtomType.AntDesignRglItem]: antDesignRglItemFn,
  // [IAtomType.AntDesignRglResponsiveContainer]:
  //   antDesignRglResponsiveContainerFn,
  [IAtomType.AntDesignModal]: antDesignModalFn,
}
