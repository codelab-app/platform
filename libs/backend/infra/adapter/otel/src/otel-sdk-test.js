import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { MultiSpanProcessor } from './exporter/multi-span-processor'

export const otelTestSDK = new NodeSDK({
  instrumentations: [],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'platform-api-test',
  }),
  spanProcessor: new MultiSpanProcessor([
    new SimpleSpanProcessor(new OTLPTraceExporter()),
  ]),
})
