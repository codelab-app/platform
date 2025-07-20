'use client'

/**
 * https://nextjs.org/docs/advanced-features/error-handling#handling-client-errors
 *
 * Error boundary as recommended by Next.js
 */
import { Component, type PropsWithChildren } from 'react'

interface ErrorState {
  hasError: boolean
}

type ErrorBoundaryProps = unknown

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorState
> {
  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }

  override state: ErrorState

  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  override componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  override render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            onClick={() => {
              this.setState({ hasError: false })
            }}
            type="button"
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}
