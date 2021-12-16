import '@fancyapps/ui/dist/fancybox.css'
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.umd.js'
import React, { useEffect } from 'react'

interface FancyboxProps {
  options?: Record<string, any>
  delegate?: string
  children: any
}

export const Fancybox = ({
  delegate = '[data-fancybox]',
  options = {},
  children,
}: FancyboxProps) => {
  useEffect(() => {
    NativeFancybox.bind(delegate, {
      ...options,
      on: {
        '*': (event: any, fancybox: any, slide: any) => {
          console.log(`event: ${event}`)
        },
      },
    })

    return () => {
      NativeFancybox.destroy()
    }
  }, [])

  return <>{children}</>
}
