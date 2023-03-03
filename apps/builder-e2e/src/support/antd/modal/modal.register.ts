import type { CypressCommand } from '../../types'
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
  getModal: typeof getModal
  getModalTitle: typeof getModalTitle
  getModalBody: typeof getModalBody
  getModalAction: typeof getModalAction
  getModalConfirmTitle: typeof getModalConfirmTitle
  getModalConfirmBody: typeof getModalConfirmBody
  getModalConfirmButtons: typeof getModalConfirmButtons
  getModalConfirmAction: typeof getModalConfirmAction
  getModalConfirmCancel: typeof getModalConfirmCancel
  getModalConfirmOk: typeof getModalConfirmOk
  expectModalTitle: typeof expectModalTitle
  expectModalText: typeof expectModalText
  expectModalActions: typeof expectModalActions
  expectModalConfirmTitle: typeof expectModalConfirmTitle
  expectModalConfirmText: typeof expectModalConfirmText
  expectModalConfirmActions: typeof expectModalConfirmActions
  expectModalToOpen: typeof expectModalToOpen
  expectModalToClose: typeof expectModalToClose
  closeModal: typeof closeModal
  resolveModal: typeof resolveModal
  resolveModalConfirm: typeof resolveModalConfirm
  confirmModalConfirm: typeof confirmModalConfirm
  cancelModalConfirm: typeof cancelModalConfirm
}

export const antModalCommands: Array<CypressCommand> = [
  {
    fn: getModal,
    name: 'getModal',
  },
  {
    fn: getModalTitle,
    name: 'getModalTitle',
  },
  {
    fn: getModalBody,
    name: 'getModalBody',
  },
  {
    fn: getModalAction,
    name: 'getModalAction',
  },
  {
    fn: getModalConfirmTitle,
    name: 'getModalConfirmTitle',
  },
  {
    fn: getModalConfirmBody,
    name: 'getModalConfirmBody',
  },
  {
    fn: getModalConfirmButtons,
    name: 'getModalConfirmButtons',
  },
  {
    fn: getModalConfirmCancel,
    name: 'getModalConfirmCancel',
  },
  {
    fn: getModalConfirmOk,
    name: 'getModalConfirmOk',
  },
  {
    fn: expectModalTitle,
    name: 'expectModalTitle',
  },
  {
    fn: expectModalText,
    name: 'expectModalText',
  },
  {
    fn: expectModalActions,
    name: 'expectModalActions',
  },
  {
    fn: expectModalConfirmTitle,
    name: 'expectModalConfirmTitle',
  },
  {
    fn: expectModalConfirmText,
    name: 'expectModalConfirmText',
  },
  {
    fn: expectModalConfirmActions,
    name: 'expectModalConfirmActions',
  },
  {
    fn: expectModalToOpen,
    name: 'expectModalToOpen',
  },
  {
    fn: closeModal,
    name: 'closeModal',
  },
  {
    fn: resolveModal,
    name: 'resolveModal',
  },
  {
    fn: resolveModalConfirm,
    name: 'resolveModalConfirm',
  },
  {
    fn: confirmModalConfirm,
    name: 'confirmModalConfirm',
  },
  {
    fn: cancelModalConfirm,
    name: 'cancelModalConfirm',
  },
]
