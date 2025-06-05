'use client'

import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Context } from 'uniforms'

import { useForm } from 'uniforms'

export interface DisplayIfFieldProps<T extends ObjectLike> {
  condition(context: Context<T>): boolean
}

export const DisplayIfField = <T extends ObjectLike>({
  children,
  condition,
}: React.PropsWithChildren<DisplayIfFieldProps<T>>) => {
  const uniforms = useForm<T>()

  return <>{condition(uniforms) ? children || null : null}</>
}

DisplayIfField.displayName = 'DisplayIfField'
