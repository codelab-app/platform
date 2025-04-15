import type { ObjectLike } from '@codelab/shared-abstract-types'

import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { useEffect } from 'react'

interface FancyboxProps {
  children: unknown
  delegate?: string
  options?: ObjectLike
}

export const Fancybox = ({
  children,
  delegate = '[data-fancybox]',
  options = {},
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
