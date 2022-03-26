import { absoluteRoot } from '@hon2a/cypress-without'
import { CommonOptions } from './types'
import {
  ifOnClock,
  logAndMute,
  MUTE,
  tickIfOnClock,
  TickOptions,
} from './utils'

export const getPopover = (options?: CommonOptions) =>
  absoluteRoot(options).find('.ant-popover:visible', options)

const forceShowPopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ 'pointer-events': 'all', opacity: 1 }))

const forceHidePopover = (options?: CommonOptions) =>
  absoluteRoot(options)
    .find('.ant-popover')
    .then(($el) => $el.css({ 'pointer-events': 'none', opacity: 0 }))

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
