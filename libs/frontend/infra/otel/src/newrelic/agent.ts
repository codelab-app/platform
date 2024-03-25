import { isBrowser } from '@codelab/shared/utils'
import type { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'

export let browserAgentInstance: BrowserAgent | null = null

export const initializeRelicAgent = async () => {
  console.log('initializeRelicAgent')

  if (!browserAgentInstance && isBrowser) {
    const { BrowserAgent: Agent } = await import(
      '@newrelic/browser-agent/loaders/browser-agent'
    )

    const { PageAction } = await import(
      '@newrelic/browser-agent/features/page_action'
    )

    const options = {
      features: [PageAction],
      info: {},
      init: {
        ajax: { enabled: false },
        jserrors: { enabled: false },
        metrics: { enabled: false },
        page_action: { enabled: true },
        page_view_timing: { enabled: false },
        session_trace: { enabled: false },
        spa: { enabled: true },
      },
      loader_config: {},
    }

    console.log('assigned new relic')
    browserAgentInstance = new Agent(options)
  }

  return browserAgentInstance
}
