// eslint-disable-next-line simple-import-sort/imports
import { otelTestSDK } from '../../libs/backend/infra/adapter/otel/src/otel-sdk-test'

if (process.env.PLATFORM_API_ENABLE_OTEL) {
  beforeAll(() => {
    otelTestSDK.start()
  })

  afterAll(async () => {
    return await otelTestSDK.shutdown().then(
      () => console.log('Opentelemetry shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
  })
}
