import React from 'react'
import { Context, useForm } from 'uniforms'

export interface DisplayIfFieldProps<T> {
  condition: (context: Context<T>) => boolean
}

export const DisplayIfField = <T extends any>({
  condition,
  children,
}: React.PropsWithChildren<DisplayIfFieldProps<T>>) => {
  const uniforms = useForm<T>()

  return <>{condition(uniforms) ? children || null : null}</>
}

DisplayIfField.displayName = 'DisplayIfField'
