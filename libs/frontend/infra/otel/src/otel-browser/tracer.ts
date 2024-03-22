import { initializeWebTraceProvider } from './otel-browser.provider'

export const fetchGithubStars = () => {
  const provider = initializeWebTraceProvider()

  return provider
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', (span) => {
      console.log('fetchGithubStars')
      span.end()
    })
}
