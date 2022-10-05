import './fancybox.module.css'
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.umd.js'
import React, { useEffect } from 'react'

interface FancyboxProps {
  options?: Record<string, unknown>
  delegate?: string
  children: unknown
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
        '*': (event: unknown, fancybox: unknown, slide: unknown) => {
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
