import {
  DATA_GRID,
  DATA_ID,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/core'
import { AtomType } from '@codelab/shared/abstract/core'
import { AtomPropsCustomizer, PropsCustomizerFn } from '../types'

const antDesignRglItemFn: PropsCustomizerFn = ({ node, props }) => ({
  // Currently the react-grid-layout library, for some reason, re-renders the layout
  // only if it detects a change in the key of the child, and doesn't care about the data-grid property
  // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
  // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo
  ...props,
  key: props[DATA_GRID] ? JSON.stringify(props[DATA_GRID]) : node.id,
  [DATA_ID]: node.id,
})

const antDesignRglResponsiveContainerFn: PropsCustomizerFn = ({ props }) => ({
  ...props,
  // onResizeStop: onResizeStop(handlers),
  style: {
    width: '200px',
    height: '200px',
  },
})

const antDesignModalFn: PropsCustomizerFn = ({ props }) => ({
  ...props,
  getContainer: `#${ROOT_RENDER_CONTAINER_ID}`,
})

export const antdPropsCustomizer: AtomPropsCustomizer = {
  [AtomType.AntDesignRglItem]: antDesignRglItemFn,
  [AtomType.AntDesignRglResponsiveContainer]: antDesignRglResponsiveContainerFn,
  [AtomType.AntDesignModal]: antDesignModalFn,
}
