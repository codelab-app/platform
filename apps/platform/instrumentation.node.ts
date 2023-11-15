import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
// import { alibabaCloudEcsDetector } from '@opentelemetry/resource-detector-alibaba-cloud'
// import {
//   awsEc2Detector,
//   awsEksDetector,
// } from '@opentelemetry/resource-detector-aws'
import { containerDetector } from '@opentelemetry/resource-detector-container'
// import { gcpDetector } from '@opentelemetry/resource-detector-gcp'
import { Resource } from '@opentelemetry/resources'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { NodeSDK } from '@opentelemetry/sdk-node'
import type { TracerConfig } from '@opentelemetry/sdk-trace-web'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const providerConfig: TracerConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-react-app',
  }),
}

const provider = new WebTracerProvider(providerConfig)

// we will use ConsoleSpanExporter to check the generated spans in dev console
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))

provider.register({
  contextManager: new ZoneContextManager(),
})

registerInstrumentations({
  instrumentations: [
    // getWebAutoInstrumentations initializes all the package.
    // it's possible to configure each instrumentation if needed.
    // getWebAutoInstrumentations({
    //   '@opentelemetry/instrumentation-fetch': {
    //     // config can be added here for example
    //     // we can initialize the instrumentation only for prod
    //     // enabled: import.meta.env.PROD,
    //   },
    // }),
  ],
})
