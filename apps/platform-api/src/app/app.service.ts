import { CodelabLogger } from '@codelab/backend/infra/adapter/logger'
import { withTracing } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import { context, trace } from '@opentelemetry/api'
import { Span } from 'nestjs-otel'

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' }
  }
}
