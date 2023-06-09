import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

/**
 * Custom setup code for CLI, since the vercel wrapper from `@vercel/otel` uses ESM, and we have to use CommonJS require.
 */
export const registerCustomOTel = (serviceName: string) => {
  console.log('Initializing OpenTelemetry...')

  // const collectorOptions = {
  //   // an optional limit on pending requests
  //   concurrencyLimit: 10,
  //   // an optional object containing custom headers to be sent with each request
  //   headers: {},
  //   // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  //   url: '<opentelemetry-collector-url>',
  // }

  const sdk = new NodeSDK({
    instrumentations: [new NestInstrumentation()],
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
    /**
     * The OTLPTraceExporter without any configuration parameters will default to sending data to localhost on port 4317 using the http/protobuf protocol.
     *
     * {
     *  endpoint: 'http://localhost:4317',
     *  protocol: 'http/protobuf',
     *  }
     */
    spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
    // traceExporter: new ConsoleSpanExporter(),
  })

  sdk.start()

  return sdk
}
