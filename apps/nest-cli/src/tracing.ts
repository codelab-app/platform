import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3'
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger'
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'

export const otelSDK = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  traceExporter: new ConsoleSpanExporter(),
  // contextManager: new AsyncLocalStorageContextManager(),
  // instrumentations: [getNodeAutoInstrumentations()],
  // metricReader: new PrometheusExporter({
  //   port: 8081,
  // }),
  // spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
  // // spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
  // textMapPropagator: new CompositePropagator({
  //   propagators: [
  //     new JaegerPropagator(),
  //     new W3CTraceContextPropagator(),
  //     new W3CBaggagePropagator(),
  //     new B3Propagator(),
  //     new B3Propagator({
  //       injectEncoding: B3InjectEncoding.MULTI_HEADER,
  //     }),
  //   ],
  // }),
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
