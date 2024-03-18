import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { expectModalToClose, getModalConfirmAction } from './modal.command'
import {
  cancelModalConfirm,
  closeModal,
  confirmModalConfirm,
  expectModalActions,
  expectModalConfirmActions,
  expectModalConfirmText,
  expectModalConfirmTitle,
  expectModalText,
  expectModalTitle,
  expectModalToOpen,
  getModal,
  getModalAction,
  getModalBody,
  getModalConfirmBody,
  getModalConfirmButtons,
  getModalConfirmCancel,
  getModalConfirmOk,
  getModalConfirmTitle,
  getModalTitle,
  resolveModal,
  resolveModalConfirm,
} from './modal.command'

export interface AntModalCommands {
  cancelModalConfirm: typeof cancelModalConfirm
  closeModal: typeof closeModal
  confirmModalConfirm: typeof confirmModalConfirm
  expectModalActions: typeof expectModalActions
  expectModalConfirmActions: typeof expectModalConfirmActions
  expectModalConfirmText: typeof expectModalConfirmText
  expectModalConfirmTitle: typeof expectModalConfirmTitle
  expectModalText: typeof expectModalText
  expectModalTitle: typeof expectModalTitle
  expectModalToClose: typeof expectModalToClose
  expectModalToOpen: typeof expectModalToOpen
  getModal: typeof getModal
  getModalAction: typeof getModalAction
  getModalBody: typeof getModalBody
  getModalConfirmAction: typeof getModalConfirmAction
  getModalConfirmBody: typeof getModalConfirmBody
  getModalConfirmButtons: typeof getModalConfirmButtons
  getModalConfirmCancel: typeof getModalConfirmCancel
  getModalConfirmOk: typeof getModalConfirmOk
  getModalConfirmTitle: typeof getModalConfirmTitle
  getModalTitle: typeof getModalTitle
  resolveModal: typeof resolveModal
  resolveModalConfirm: typeof resolveModalConfirm
}

export const antModalCommands: Array<CypressCommand> = [
  {
    fn: getModal,
  },
  {
    fn: getModalTitle,
  },
  {
    fn: getModalBody,
  },
  {
    fn: getModalAction,
  },
  {
    fn: getModalConfirmTitle,
  },
  {
    fn: getModalConfirmBody,
  },
  {
    fn: getModalConfirmButtons,
  },
  {
    fn: getModalConfirmCancel,
  },
  {
    fn: getModalConfirmOk,
  },
  {
    fn: expectModalTitle,
  },
  {
    fn: expectModalText,
  },
  {
    fn: expectModalActions,
  },
  {
    fn: expectModalConfirmTitle,
  },
  {
    fn: expectModalConfirmText,
  },
  {
    fn: expectModalConfirmActions,
  },
  {
    fn: expectModalToOpen,
  },
  {
    fn: closeModal,
  },
  {
    fn: resolveModal,
  },
  {
    fn: resolveModalConfirm,
  },
  {
    fn: confirmModalConfirm,
  },
  {
    fn: cancelModalConfirm,
  },
]
