import { absoluteRoot } from '@hon2a/cypress-without'
import pickBy from 'lodash/pickBy'
import { CommonOptions, Label } from '../types'
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
}: { text?: Label } & CommonOptions = {}) =>
  find(
    '.ant-notification-notice:visible .ant-notification-notice-message',
    text,
    options,
  )

export const getNotificationBody = ({
  text,
  ...options
}: { text?: Label } & CommonOptions = {}) =>
  find(
    '.ant-notification-notice:visible .ant-notification-notice-description',
    text,
    options,
  )

export const expectNotification = ({
  title,
  body,
  ...options
}: { title?: Label; body?: Label } & CommonOptions = {}) => {
  const opts = logAndMute(
    'expectNotification',
    JSON.stringify(pickBy({ title, body }, Boolean)),
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
