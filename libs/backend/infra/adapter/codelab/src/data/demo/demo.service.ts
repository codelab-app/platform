import {
  TraceService,
  withActiveSpan,
} from '@codelab/backend/infra/adapter/otel'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DemoService {
  arrs = [0, 1, 2, 3, 4]

  constructor(private readonly traceService: TraceService) {}

  async execute() {
    const span = this.traceService.getSpan()

    console.log(span)

    span?.end()

    for (const arr of this.arrs) {
      await withActiveSpan('demo', () => this.methodA())
    }
  }

  async methodA() {
    for (const arr of this.arrs) {
      await this.methodB()
    }
  }

  async methodB() {
    return Promise.resolve()
  }
}
