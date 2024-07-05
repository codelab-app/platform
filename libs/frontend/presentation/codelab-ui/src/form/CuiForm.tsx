import type { ReactNode } from 'react'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

interface FormProps {
  children: ReactNode
  defaultValues: Record<string, any>
  onSubmit(data: Record<string, any>): void
}

export const CuiForm = ({ children, defaultValues, onSubmit }: FormProps) => {
  const { handleSubmit, register } = useForm({
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          return React.createElement(child.type, {
            ...{
              ...child.props,
              key: child.props.name,
              register: register,
            },
          })
        }

        return child
      })}
    </form>
  )
}
