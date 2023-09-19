import { absoluteRoot } from '@hon2a/cypress-without'
import type { CommonOptions } from '../types'

export const forceShowPopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ opacity: 1, 'pointer-events': 'all' }))

export const forceHidePopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ opacity: 0, 'pointer-events': 'none' }))
