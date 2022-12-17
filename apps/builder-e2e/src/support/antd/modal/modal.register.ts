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
    name: 'getModal',
    fn: getModal,
  },
  {
    name: 'getModalTitle',
    fn: getModalTitle,
  },
  {
    name: 'getModalBody',
    fn: getModalBody,
  },
  {
    name: 'getModalAction',
    fn: getModalAction,
  },
  {
    name: 'getModalConfirmTitle',
    fn: getModalConfirmTitle,
  },
  {
    name: 'getModalConfirmBody',
    fn: getModalConfirmBody,
  },
  {
    name: 'getModalConfirmButtons',
    fn: getModalConfirmButtons,
  },
  {
    name: 'getModalConfirmCancel',
    fn: getModalConfirmCancel,
  },
  {
    name: 'getModalConfirmOk',
    fn: getModalConfirmOk,
  },
  {
    name: 'expectModalTitle',
    fn: expectModalTitle,
  },
  {
    name: 'expectModalText',
    fn: expectModalText,
  },
  {
    name: 'expectModalActions',
    fn: expectModalActions,
  },
  {
    name: 'expectModalConfirmTitle',
    fn: expectModalConfirmTitle,
  },
  {
    name: 'expectModalConfirmText',
    fn: expectModalConfirmText,
  },
  {
    name: 'expectModalConfirmActions',
    fn: expectModalConfirmActions,
  },
  {
    name: 'expectModalToOpen',
    fn: expectModalToOpen,
  },
  {
    name: 'closeModal',
    fn: closeModal,
  },
  {
    name: 'resolveModal',
    fn: resolveModal,
  },
  {
    name: 'resolveModalConfirm',
    fn: resolveModalConfirm,
  },
  {
    name: 'confirmModalConfirm',
    fn: confirmModalConfirm,
  },
  {
    name: 'cancelModalConfirm',
    fn: cancelModalConfirm,
  },
]
