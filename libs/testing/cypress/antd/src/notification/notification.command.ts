import { absoluteRoot } from '@hon2a/cypress-without'
import pickBy from 'lodash/pickBy'
import type { CommonOptions, Label } from '../types'
import { logAndMute } from '../utils'

const find = (selector: string, text?: Label, options?: CommonOptions) =>
  text ? cy.contains(selector, text, options) : cy.get(selector, options)

export const getNotification = (
  options: Partial<Cypress.Loggable> | undefined,
) => {
  const opts = logAndMute('getNotification', '', options)

  return absoluteRoot(opts).find('.ant-notification-notice:visible')
}

export const getNotificationTitle = ({
  text,
  ...options
}: CommonOptions & { text?: Label } = {}) =>
  find(
    '.ant-notification-notice:visible .ant-notification-notice-message',
    text,
    options,
  )

export const getNotificationBody = ({
  text,
  ...options
}: CommonOptions & { text?: Label } = {}) =>
  find(
    '.ant-notification-notice:visible .ant-notification-notice-description',
    text,
    options,
  )

export const expectNotification = ({
  body,
  title,
  ...options
}: CommonOptions & { body?: Label; title?: Label } = {}) => {
  const opts = logAndMute(
    'expectNotification',
    JSON.stringify(pickBy({ body, title }, Boolean)),
    options,
  )

  getNotification(options).should('exist')

  if (title) {
    const titleChain = getNotificationTitle({ text: title, ...opts }).should(
      'exist',
    )

    if (body) {
      titleChain.next(opts).should('have.text', body)
    }
  } else if (body) {
    getNotificationBody({ text: body, ...opts }).should('exist')
  }
}
