import { absoluteRoot } from '@hon2a/cypress-without'
import type { CommonOptions } from '../types'

export const forceShowPopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ 'pointer-events': 'all', opacity: 1 }))

export const forceHidePopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ 'pointer-events': 'none', opacity: 0 }))
