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
