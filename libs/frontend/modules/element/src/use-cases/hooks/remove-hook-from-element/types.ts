import {
  EmptyJsonSchemaType,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { ButtonProps } from 'antd'
import { PropsWithChildren } from 'react'
import { HookFragment } from '../../../graphql/Element.fragment.graphql.gen'

export type RemoveHookFromElementButtonProps = PropsWithChildren<
  Omit<ButtonProps, 'onClick'> & {
    hookId: string
    entity?: HookFragment
  }
>

export type RemoveHookFromElementFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>
