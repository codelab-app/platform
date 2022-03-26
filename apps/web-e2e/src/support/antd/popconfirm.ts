import { absoluteRoot } from '@hon2a/cypress-without'
import { CommonOptions } from './types'
import { logAndMute } from './utils'

export const getPopconfirm = (options?: CommonOptions) =>
  absoluteRoot().find('.ant-popconfirm:not(.ant-popover-hidden)', options)

export const expectPopconfirm = (text: string, options?: CommonOptions) => {
  const opts = logAndMute('expectPopconfirm', '', options)
  getPopconfirm(opts)
    .find('.ant-popover-message-title', opts)
    .should('contain', text)
}

const resolvePopconfirm = (buttonIdx: number, options?: CommonOptions) =>
  getPopconfirm(options)
    .find('.ant-popover-buttons button', options)
    .eq(buttonIdx, options)
    .click(options)

export const confirmPopconfirm = (options?: CommonOptions) =>
  resolvePopconfirm(1, logAndMute('confirmPopconfirm', '', options))

export const cancelPopconfirm = (options?: CommonOptions) =>
  resolvePopconfirm(0, logAndMute('cancelPopconfirm', '', options))
