'use client'

import { useEffect } from 'react'

export const Error = (title: string) => {
  const ErrorComponent = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset(): void
  }) => {
    useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
    }, [error])

    return <h2>Builder Page Error</h2>
  }

  ErrorComponent.displayName = `Error(${title})`

  return ErrorComponent
}
