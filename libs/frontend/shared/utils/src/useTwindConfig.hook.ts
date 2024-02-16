import install from '@twind/with-next/app'
import { useEffect } from 'react'

const suppressWarning = (event: Event) => {
  // prevent default console.warn(`[<code>] <message>: <detail>`) logging
  event.preventDefault()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTwindConfig = (config: any) => {
  useEffect(() => {
    window.addEventListener('warning', suppressWarning)

    install(config)

    return () => window.removeEventListener('warning', suppressWarning)
  }, [])
}
