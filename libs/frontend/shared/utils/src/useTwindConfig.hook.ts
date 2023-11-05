import install from '@twind/with-next/app'
import { useEffect } from 'react'

const suppressWarning = (event: Event) => {
  // prevent default console.warn(`[<code>] <message>: <detail>`) logging
  event.preventDefault()
}

export const useTwindConfig = (config: any) => {
  useEffect(() => {
    window.addEventListener('warning', suppressWarning)

    install(config)

    return () => window.removeEventListener('warning', suppressWarning)
  }, [])
}
