import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { MultiSpanProcessor } from './exporter/multi-span-processor'

export const otelSDK = new NodeSDK({
  // instrumentations: [new NestInstrumentation()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'platform-api',
  }),
  spanProcessor: new MultiSpanProcessor([
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
    new SimpleSpanProcessor(new OTLPTraceExporter()),
  ]),
  /**
   * Not needed, trace exporter is passed as param to span processor
   */
  // traceExporter: new ConsoleSpanExporter(),
})

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0))
})
