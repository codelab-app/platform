'use client'

import type { Context, UnknownObject } from 'uniforms'

import { useForm } from 'uniforms'

export interface DisplayIfFieldProps<T extends UnknownObject> {
  condition(context: Context<T>): boolean
}

export const DisplayIfField = <T extends UnknownObject>({
  children,
  condition,
}: React.PropsWithChildren<DisplayIfFieldProps<T>>) => {
  const uniforms = useForm<T>()

  return <>{condition(uniforms) ? children || null : null}</>
}

DisplayIfField.displayName = 'DisplayIfField'
