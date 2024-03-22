import { isBrowser, isServer } from '@codelab/shared/utils'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { B3Propagator } from '@opentelemetry/propagator-b3'
import { Resource } from '@opentelemetry/resources'
import type { TracerConfig } from '@opentelemetry/sdk-trace-base'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
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
      new OTLPTraceExporter({
        hostname: '127.0.0.1',
        url: 'http://127.0.0.1:4318/v1/traces',
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
