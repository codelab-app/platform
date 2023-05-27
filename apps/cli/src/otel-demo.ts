import { registerCustomOTel, withTracing } from '@codelab/shared/infra/otel'
import type { Span } from '@opentelemetry/api'
import opentelemetry from '@opentelemetry/api'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

export const doWork = () => {
  console.log('test')
}

registerCustomOTel('codelab-cli')

void withTracing('demo', () => doWork())
