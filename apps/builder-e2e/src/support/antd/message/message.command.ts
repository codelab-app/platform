import { absoluteRoot } from '@hon2a/cypress-without'

type MessageType = 'notice' | 'warning' | 'success' | 'error' | 'loading'

export const MESSAGE_TYPE = {
  ERROR: 'error',
  INFO: 'notice',
  LOADING: 'loading',
  SUCCESS: 'success',
  WARNING: 'warning',
}

type GetMessageOptions = { type?: MessageType } & Partial<
  Cypress.Loggable & Cypress.Timeoutable
>

export const getMessage = ({ type, ...options }: GetMessageOptions = {}) =>
  absoluteRoot(options).find(
    `.ant-message${type ? `-${type}` : ''}:visible`,
    options,
  )

export const expectMessage = (text: string, options?: GetMessageOptions) =>
  getMessage(options).should('contain', text)
