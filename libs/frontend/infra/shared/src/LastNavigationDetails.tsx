'use client'

import type { Navigation } from '@shopify/react-performance'

import { useNavigationListener } from '@shopify/react-performance'
import { useState } from 'react'

// A component which displays simple performance stats about the last navigation performed by the user
export const LastNavigationDetails = () => {
  // create some state to hold the last navigation
  const [lastNavigation, setLastNavigation] = useState<Navigation | null>(null)

  // listen for subsequent client-side navigations and update our state
  useNavigationListener((navigation) => {
    setLastNavigation(navigation)
  })

  if (lastNavigation == null) {
    return <p>no data</p>
  }

  const { duration, isFullPageNavigation, target } = lastNavigation

  // output some information about the last navigation
  const navigationType = isFullPageNavigation
    ? 'full page navigation'
    : 'single-page-app style navigation'

  return (
    <p>
      The last navigation was to {target}. It was a {navigationType} navigation
      which took {duration / 1000} seconds to complete.
    </p>
  )
}
