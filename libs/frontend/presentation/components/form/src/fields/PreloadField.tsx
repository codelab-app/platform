'use client'

import type { Context } from 'uniforms'

import { useAsync } from 'react-use'
import { useForm } from 'uniforms'

export interface PreloadFieldProps<T> {
  preload?(context: Context<T>): Promise<void>
}

export const PreloadField = <T,>({
  children,
  preload,
}: React.PropsWithChildren<PreloadFieldProps<T>>) => {
  const uniforms = useForm<T>()

  const { loading } = useAsync(async () => {
    if (!preload) {
      return
    }

    await preload(uniforms)
  }, [])

  return <>{loading ? null : children}</>
}

PreloadField.displayName = 'PreloadField'
