import {
  ElementFragment,
  HookFragment,
} from '../../../graphql/Element.fragment.graphql.gen'

export type HooksListItemDescriptionProps = { hook: HookFragment }

export type HooksListProps = {
  element: ElementFragment
}

export type HooksListItemProps = {
  hook: HookFragment
}
