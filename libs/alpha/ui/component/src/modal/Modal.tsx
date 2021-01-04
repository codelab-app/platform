import React from 'react'
import { modal, modalButton } from './Modal.data'
import { Renderer } from '@codelab/alpha/core/renderer'
import { ComponentProps } from '@codelab/alpha/shared/interface/component'
import { ContextModal, EventModal } from '@codelab/alpha/state/modal'
import { withActor } from '@codelab/alpha/ui/hoc'

export const ModalButton = withActor<ContextModal, EventModal>(
  Renderer.components(modalButton),
)

export const Modal: React.FC<ComponentProps<
  ContextModal,
  EventModal
>> = withActor<ContextModal, EventModal>(Renderer.components(modal))
