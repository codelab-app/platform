import { absoluteRoot } from '@hon2a/cypress-without'

type MessageType = 'error' | 'loading' | 'notice' | 'success' | 'warning'

export const MESSAGE_TYPE = {
  ERROR: 'error',
  INFO: 'notice',
  LOADING: 'loading',
  SUCCESS: 'success',
  WARNING: 'warning',
}

type GetMessageOptions = Partial<Cypress.Loggable & Cypress.Timeoutable> & {
  type?: MessageType
}

export const getMessage = ({ type, ...options }: GetMessageOptions = {}) =>
  absoluteRoot(options).find(
    `.ant-message${type ? `-${type}` : ''}:visible`,
    options,
  )

export const expectMessage = (text: string, options?: GetMessageOptions) =>
  getMessage(options).should('contain', text)
