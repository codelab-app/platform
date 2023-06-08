import { OpenTelemetryModule } from 'nestjs-otel'

export const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    // Includes Host Metrics
    apiMetrics: {
      // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'label',
      },
      enable: true,
      // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreRoutes: ['/favicon.ico'],
      // Records metrics for all URLs, even undefined ones
      ignoreUndefinedRoutes: false,
    },
    hostMetrics: true,
  },
})
