import type { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'

import { useEffect, useState } from 'react'

export const useRelicAgent = () => {
  const [agent, setAgent] = useState<BrowserAgent | undefined>(undefined)

  useEffect(() => {
    const options = {
      init: {},
    }

    // Assuming 'Agent' is your New Relic BrowserAgent class or factory function
    if (!agent) {
      // Check if the agent is not already initialized
      import('@newrelic/browser-agent/loaders/browser-agent')
        .then(({ BrowserAgent: Agent }) => {
          const newAgent = new Agent(options)

          setAgent(newAgent)
        })
        .catch((error) => {
          console.error('Failed to load New Relic agent:', error)
        })
    }
  }, [agent])

  return agent
}
