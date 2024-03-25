import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { B3Propagator } from '@opentelemetry/propagator-b3'
import { Resource } from '@opentelemetry/resources'
import type { TracerConfig } from '@opentelemetry/sdk-trace-base'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

let provider: WebTracerProvider | undefined = undefined

/**
 * We can either send trace data to Jaeger directly, or via Otel
 *
 * https://www.jaegertracing.io/docs/1.55/architecture/#with-opentelemetry-collector
 */
export const initializeWebTraceProvider = () => {
  if (provider) {
    return provider
  }

  /**
   * https://stackoverflow.com/questions/63485673/how-to-correctly-use-opentelemetry-exporter-with-opentelemetry-collector-in-clie/63489195#63489195
   */
  const config: TracerConfig = {
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'platform',
    }),
  }

  provider = new WebTracerProvider(config)

  // webTraceProvider.addSpanProcessor(
  //   new SimpleSpanProcessor(new ConsoleSpanExporter()),
  // )
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      /**
       * https://github.com/open-telemetry/opentelemetry-js/issues/3062#issuecomment-1189189494
       *
       * https://stackoverflow.com/questions/76266837/open-telemetry-cors-issue-exporting-trace-data-to-jaeger
       *
       * Apparently Jaeger doesn't support CORS through OTLP endpoints
       *
       * Cors is a `receivers` issue, not `exporters`, since `receivers` is collecting data from our client in the browser, and only browser have CORS restrictions.
       *
       * Exporters is server-side to server-side, so no cors issue
       *
       * Trying the reverse proxy, going through OTEL as intermediate doesn't seem to work
       */
      new OTLPTraceExporter({
        // headers: {},
        // hostname: '127.0.0.1',
        // url: '127.0.0.1:4318/v1/traces',
        // url: 'http://127.0.0.1:4318/v1/traces',
        url: 'http://127.0.0.1:3000/api/otel/v1/traces',
      }),
    ),
  )

  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
    propagator: new B3Propagator(),
  })

  return provider

  // Registering instrumentations
  // registerInstrumentations({
  //   instrumentations: [new DocumentLoadInstrumentation()],
  // })

  // const sdk = new NodeSDK({
  //   // instrumentations: [getNodeAutoInstrumentations()],
  //   traceExporter: exporter,
  // })

  // sdk.start()

  // process.on('SIGTERM', () => {
  //   sdk
  //     .shutdown()
  //     .then(() => console.log('Tracing terminated'))
  //     .catch((error) => console.log('Error terminating tracing', error))
  //     .finally(() => process.exit(0))
  // })
}
