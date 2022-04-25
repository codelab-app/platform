/**
 * https://nextjs.org/docs/advanced-features/error-handling#handling-client-errors
 *
 * Error boundary as recommended by Next.js
 */
import React from 'react'

interface ErrorState {
  hasError: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorBoundaryProps {
  //
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorState
> {
  override state: ErrorState

  constructor(props: any) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }

  override componentDidCatch(error: any, errorInfo: any) {
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
            onClick={() => this.setState({ hasError: false })}
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
