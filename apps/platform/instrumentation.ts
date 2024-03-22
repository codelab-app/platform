import { initializeWebTraceProvider } from '@codelab/frontend/infra/otel'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import opentelemetry, { NodeSDK } from '@opentelemetry/sdk-node'
import type { TracerConfig } from '@opentelemetry/sdk-trace-base'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

export const register = async () => {
  initializeWebTraceProvider()
}
