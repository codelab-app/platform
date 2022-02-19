import { IElement, IHook } from '@codelab/shared/abstract/core'
import { HookFragment } from '../../../graphql'

export type HooksListItemDescriptionProps = { hook: HookFragment }

export type HooksListProps = {
  element: IElement
}

export type HooksListItemProps = {
  hook: IHook
}
