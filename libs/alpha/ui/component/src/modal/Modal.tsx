import React from 'react'
import { modal, modalButton } from './Modal.data'
import { Renderer } from '@codelab/alpha/core/renderer'
import { ComponentProps } from '@codelab/alpha/shared/interface/component'
import { withActor } from '@codelab/alpha/ui/hoc'

export const ModalButton = withActor(Renderer.components(modalButton))

export const Modal: React.FC<ComponentProps> = withActor(
  Renderer.components(modal),
)
