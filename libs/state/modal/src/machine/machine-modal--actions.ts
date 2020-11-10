import { ActionFunctionMap, send } from 'xstate'
import { ContextModal } from './machine-modal--context'
import { EventModal, EventNameModal } from './machine-modal--event'

export const modalActions: ActionFunctionMap<ContextModal, EventModal> = {
  handleCancel: (context, event) => send(EventNameModal.CLOSE),
}
