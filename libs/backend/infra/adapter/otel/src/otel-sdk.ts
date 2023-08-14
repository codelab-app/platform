import { TRACER_NAME } from '@codelab/shared/infra/otel'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3'
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { MultiSpanProcessor } from './exporter/multi-span-processor'

export const otelSDK = new NodeSDK({
  /**
   * This is used by OpenTelemetry to manage the current context. In JavaScript, because of its single-threaded nature and the asynchronous patterns of writing code (callbacks, promises, async/await), it can be difficult to keep track of what the "current" execution context is. This is particularly important in tracing, because you want to be able to create child spans from a parent span even in deeply asynchronous code. The context manager provides a mechanism to always access the current span. One of the most commonly used context managers in Node.js is the AsyncLocalStorageContextManager, which uses a Node.js API (AsyncLocalStorage) to manage context across async operations.
   */
  contextManager: new AsyncLocalStorageContextManager(),
  instrumentations: [
    // getNodeAutoInstrumentations(),
    // new NestInstrumentation(),
    // new HttpInstrumentation(),
    // new ExpressInstrumentation(),
    // new GraphQLInstrumentation(),
  ],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: TRACER_NAME,
  }),
  // spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter(), {
  //   // maxQueueSize: 4096,
  // }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
  // spanProcessor: new MultiSpanProcessor([
  //   // new SimpleSpanProcessor(new ConsoleSpanExporter()),
  //   new SimpleSpanProcessor(new OTLPTraceExporter()),
  // ]),
  /**
   * This is used to serialize and deserialize state across process boundaries. Specifically, it defines a way to serialize the span context (which includes the trace ID, span ID, and trace flags) and any baggage into a format that can be attached to an "outgoing request" (like an HTTP header), and then to deserialize that data back into a span context on the receiving side. This propagation allows traces to cross process/network boundaries and be reconstructed on the other side.
   */
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      // new W3CBaggagePropagator(),
      // new B3Propagator(),
      // new B3Propagator({
      //   injectEncoding: B3InjectEncoding.MULTI_HEADER,
      // }),
    ],
  }),
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
