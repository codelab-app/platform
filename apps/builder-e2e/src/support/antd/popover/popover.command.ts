import { absoluteRoot } from '@hon2a/cypress-without'
import type { CommonOptions } from '../types'
import type { TickOptions } from '../utils'
import { ifOnClock, logAndMute, MUTE, tickIfOnClock } from '../utils'
import { forceHidePopover, forceShowPopover } from './popover.util'

export const getPopover = (options?: CommonOptions) =>
  absoluteRoot(options).find('.ant-popover:visible', options)

export const showPopover =
  (options?: CommonOptions & TickOptions) => ($el: JQuery) => {
    const opts = logAndMute('showPopover', undefined, options)
    cy.wrap($el, MUTE).trigger('mouseover', { force: true, ...opts })
    tickIfOnClock(opts)
    ifOnClock(() => forceShowPopover(opts))

    return tickIfOnClock(opts).then(() => $el)
  }

export const hidePopover =
  (options?: CommonOptions & TickOptions) => ($el: JQuery) => {
    const opts = logAndMute('hidePopover', undefined, options)
    cy.wrap($el, MUTE).trigger('mouseover', { force: true, ...opts })
    tickIfOnClock(opts)
    ifOnClock(() => forceHidePopover(opts))

    return tickIfOnClock(opts).then(() => $el)
  }
