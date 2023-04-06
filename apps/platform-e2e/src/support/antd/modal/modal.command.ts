import { absoluteRoot } from '@hon2a/cypress-without'
import type { CommonOptions, Label } from '../types'
import { logAndMute } from '../utils'

export const getModal = (options?: CommonOptions) =>
  absoluteRoot().find('.ant-modal:visible', options)

export const getModalTitle = (options?: CommonOptions) =>
  getModal(options).find('.ant-modal-title', options)

export const getModalBody = (options?: CommonOptions) =>
  getModal(options).find('.ant-modal-body', options)

export const getModalAction = (
  label: Label,
  options?:
    | CommonOptions
    | (Partial<Cypress.Loggable> & { log: boolean })
    | undefined,
) =>
  getModal(options)
    .find('.ant-modal-footer', options)
    .contains('button', label, options)

export const getModalConfirmTitle = (options?: CommonOptions) =>
  getModal(options).find('.ant-modal-confirm-title', options)

export const getModalConfirmBody = (options?: CommonOptions) =>
  getModal(options).find('.ant-modal-confirm-content', options)

export const getModalConfirmButtons = (options?: CommonOptions) =>
  getModal(options).find('.ant-modal-confirm-btns', options)

export const getModalConfirmAction = (
  label: Label,
  options?: CommonOptions | Partial<Cypress.Loggable>,
) => getModalConfirmButtons(options).contains('button', label, options)

export const getModalConfirmCancel = (options?: CommonOptions) =>
  getModalConfirmButtons(options).find('.ant-btn:not(.ant-btn-primary)')

export const getModalConfirmOk = (options?: CommonOptions) =>
  getModalConfirmButtons(options).find('.ant-btn-primary')

export const expectModalTitle = (
  expectedTitle: string,
  options?: CommonOptions,
) => getModalTitle(options).should('have.text', expectedTitle)

export const expectModalText = (
  expectedText: string,
  options?: CommonOptions,
) => getModalBody(options).should('have.text', expectedText)

export const expectModalActions = (
  labels: Array<Label>,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute('expectModalActions', labels.join(', '), options)
  labels.forEach((label) => getModalAction(label, opts).should('be.visible'))
}

export const expectModalConfirmTitle = (
  expectedTitle: string,
  options?: CommonOptions,
) => getModalConfirmTitle(options).should('have.text', expectedTitle)

export const expectModalConfirmText = (
  expectedText: string,
  options?: CommonOptions,
) => getModalConfirmBody(options).should('have.text', expectedText)

export const expectModalConfirmActions = (
  labels: Array<Label>,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute(
    'expectModalConfirmActions',
    labels.join(', '),
    options,
  )

  labels.forEach((label) =>
    getModalConfirmAction(label, opts).should('be.visible'),
  )
}

export const expectModalToOpen = (options?: CommonOptions) =>
  getModal(options).should('exist')

export const expectModalToClose = (options?: CommonOptions) => {
  absoluteRoot()
    .find('.ant-modal-mask:not(.ant-modal-mask-hidden)', options)
    .should('not.exist')
  absoluteRoot().find('.ant-modal', options).should('not.be.visible')
}

export const closeModal = (
  options?: CommonOptions | Partial<Cypress.ClickOptions>,
) => getModal(options).find('.ant-modal-close-x', options).click(options)

export const resolveModal = (
  label: Label,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute('resolveModal', label.toString(), options)
  getModalAction(label, opts).click(opts)
}

export const resolveModalConfirm = (
  label: Label,
  options?: Partial<Cypress.Loggable>,
) => {
  const opts = logAndMute('resolveModalConfirm', label.toString(), options)
  getModalConfirmAction(label, opts).click(opts)
}

export const confirmModalConfirm = (
  options?: CommonOptions | Partial<Cypress.ClickOptions>,
) => getModalConfirmOk(options).click(options)

export const cancelModalConfirm = (
  options?: CommonOptions | Partial<Cypress.ClickOptions>,
) => getModalConfirmCancel(options).click(options)
