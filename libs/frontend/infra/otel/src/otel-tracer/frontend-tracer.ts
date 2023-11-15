import type { Span } from '@opentelemetry/api'
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { browserDetector, Resource } from '@opentelemetry/resources'
import { detectResourcesSync } from '@opentelemetry/resources/build/src/detect-resources'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SessionIdProcessor } from './session-id-processor'

const {
  NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
  NEXT_PUBLIC_OTEL_SERVICE_NAME = '',
} = typeof window !== 'undefined' ? process.env : {}

const FrontendTracer = async (collectorString: string) => {
  const { ZoneContextManager } = await import('@opentelemetry/context-zone')

  let resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: NEXT_PUBLIC_OTEL_SERVICE_NAME,
  })

  const detectedResources = detectResourcesSync({
    detectors: [browserDetector],
  })

  resource = resource.merge(detectedResources)

  const provider = new WebTracerProvider({
    resource,
  })

  provider.addSpanProcessor(new SessionIdProcessor())

  provider.addSpanProcessor(
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url:
          NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
          collectorString ||
          'http://localhost:4318/v1/traces',
      }),
    ),
  )

  const contextManager = new ZoneContextManager()

  provider.register({
    contextManager,
    propagator: new CompositePropagator({
      propagators: [
        new W3CBaggagePropagator(),
        new W3CTraceContextPropagator(),
      ],
    }),
  })

  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-fetch': {
          applyCustomAttributesOnSpan: (span: Span) => {
            span.setAttribute('app.synthetic_request', 'false')
          },
          clearTimingResources: true,
          propagateTraceHeaderCorsUrls: /.*/,
        },
      }),
    ],
    tracerProvider: provider,
  })
}

export default FrontendTracer
