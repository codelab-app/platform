import React from 'react'
import { modal, modalButton } from './Modal.data'
import { Renderer } from '@codelab/core/renderer'
import { ComponentProps } from '@codelab/shared/interface/component'
import { ContextUI, EventUI } from '@codelab/state/ui'
import { withActor } from '@codelab/ui/hoc'

export const ModalButton = withActor<ContextUI, EventUI>(
  Renderer.components(modalButton),
)

export const Modal: React.FC<ComponentProps<ContextUI, EventUI>> = withActor<
  ContextUI,
  EventUI
>(Renderer.components(modal))
